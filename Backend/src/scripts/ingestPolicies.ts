import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { ChromaClient } from 'chromadb';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { getLocalEmbedding, localEmbeddingFunction } from '../services/agentService';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const client = new ChromaClient({ path: process.env.CHROMA_URL || 'http://localhost:8000' });

async function ingest() {
  console.log('Reading policy document...');
  const text = fs.readFileSync(path.join(__dirname, '../../company_policy.md'), 'utf8');

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 50,
  });
  const chunks = await splitter.createDocuments([text]);

  const collection = await client.getOrCreateCollection({
    name: process.env.CHROMA_COLLECTION_NAME || 'support-policies',
    embeddingFunction: localEmbeddingFunction,
  });

  const ids: string[] = [];
  const embeddings: number[][] = [];
  const metadatas: Array<Record<string, string>> = [];
  const documents: string[] = [];

  console.log(`Generating embeddings for ${chunks.length} chunks...`);
  for (let i = 0; i < chunks.length; i++) {
    const chunkText = chunks[i].pageContent;
    const embedding = await getLocalEmbedding(chunkText);

    ids.push(`chunk-${i}`);
    embeddings.push(embedding);
    metadatas.push({ text: chunkText });
    documents.push(chunkText);
  }

  console.log('Upserting vectors to ChromaDB...');
  await collection.add({
    ids,
    embeddings,
    metadatas,
    documents,
  });
  console.log('Ingestion complete!');
}

ingest().catch(console.error);
