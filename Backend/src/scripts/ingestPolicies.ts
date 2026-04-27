import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { getLocalEmbedding } from '../services/agentService';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
});

async function ingest() {
  console.log('Reading policy document...');
  const text = fs.readFileSync(path.join(__dirname, '../../company_policy.md'), 'utf8');

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 50,
  });
  const chunks = await splitter.createDocuments([text]);

  const index = pc.Index(process.env.PINECONE_INDEX_NAME || 'support-policies');

  const records = [];

  console.log(`Generating embeddings for ${chunks.length} chunks...`);
  for (let i = 0; i < chunks.length; i++) {
    const chunkText = chunks[i].pageContent;
    const embedding = await getLocalEmbedding(chunkText);

    records.push({
      id: `chunk-${i}`,
      values: embedding,
      metadata: { text: chunkText }
    });
  }

  console.log('Upserting vectors to Pinecone...');
  await index.upsert({ records: records });
  console.log('Ingestion complete!');
}

ingest().catch(console.error);
