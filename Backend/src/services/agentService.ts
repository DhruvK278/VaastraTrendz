import { Pinecone } from '@pinecone-database/pinecone';
import { pipeline } from '@xenova/transformers';

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
});

const baseSystemPrompt = `
You are a helpful customer support executive working with VaastraTrendz, a premium online clothing and fashion e-commerce brand. You manage customer complaints on a regular basis and provide resolutions for clothing-related issues.

The issues raised by the customer will belong to the following categories:

1. Sizing & Fit Issues
2. Fabric & Quality Defects
3. Wrong Item Received
4. Color Mismatch
5. Damaged in Shipping
6. Late / Lost Delivery
7. Price / Promotion Dispute
8. Care & Maintenance Query

Along with the category, you will also receive a description of the issue and the customer's details such as name and email address. You will have to provide a resolution to the customer's issue based on the information provided.

The resolution can be one of the following options:

1. Refund
2. Replacement
3. Repair
4. Discount
5. Apology
6. Return
7. Exchange
8. Compensation
9. Service Enhancement

You will also provide a description of the resolution. You will provide a confidence score for the resolution you provide. The confidence score should be between 0 and 100. The higher the confidence score, the more confident you are that the resolution will solve the customer's issue.

Your decision should be based on the best interests of the customer and the company. While providing the best resolution possible, you should also consider the cost to the company and the impact on the customer. A replacement should not be given for a minor issue (like slight color variation) and a refund should not be given when an exchange would suffice. You should also consider the customer's loyalty and the impact on the company's reputation.

You will only provide a JSON response with the resolution, resolution description and the confidence score. The response should be in the following format:

{
    "resolution": "Refund",
    "resolution_description": "Issue a full refund to the customer since the garment arrived with a major stitching defect.",
    "confidence_score": 95
}
`;

let embeddingPipeline: any = null;

async function getLocalEmbedding(text: string): Promise<number[]> {
  if (!embeddingPipeline) {
    // This runs completely locally!
    embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  const result = await embeddingPipeline(text, { pooling: 'mean', normalize: true });
  return Array.from(result.data);
}

const localEmbeddingFunction = {
  generate: async (texts: string[]): Promise<number[][]> => {
    return await Promise.all(texts.map((text) => getLocalEmbedding(text)));
  },
};

interface AgentInput {
  issue: string;
  description: string;
}

interface AgentResponse {
  resolution: string;
  resolution_description: string;
  confidence_score: number;
}

export async function getAgentResponse(data: AgentInput): Promise<AgentResponse> {
  // 1. Generate embedding for the incoming complaint
  const queryEmbedding = await getLocalEmbedding(data.description);

  // 2. Query Pinecone for relevant policy chunks
  const index = pc.Index(process.env.PINECONE_INDEX_NAME || 'support-policies');
  
  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 3,
    includeMetadata: true,
  });

  const retrievedContext = queryResponse.matches
    .map(match => match.metadata?.text || '')
    .join('\n\n');

  // 3. Augment the system prompt with retrieved policy context
  const augmentedSystemPrompt = `${baseSystemPrompt}

Use the following VaastraTrendz company policy to inform your decision. You must STRICTLY adhere to these rules:
${retrievedContext}
`;

  // 4. Call Groq API (Running LLaMA 3 locally-like speeds)
  const url = 'https://api.groq.com/openai/v1/chat/completions';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: augmentedSystemPrompt },
        {
          role: 'user',
          content: ` issue : ${data.issue} , description : ${data.description} `,
        },
      ],
      model: 'llama-3.1-8b-instant',
      response_format: { type: "json_object" }
    }),
  };

  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(`Groq API Error: ${JSON.stringify(json.error)}`);
  }
  console.log('Agent response:', json.choices[0].message.content);
  return JSON.parse(json.choices[0].message.content);
}

export { getLocalEmbedding, localEmbeddingFunction };
