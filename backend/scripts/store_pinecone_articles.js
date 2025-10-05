import 'dotenv/config'; 
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import fs from 'fs/promises';

const BATCH_SIZE = 100;

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
});
const openai = new OpenAI();
const pineconeIndexName = process.env.PINECONE_INDEX_NAME || 'nasa';

async function runIngestion() {
    console.log('🔹 Initializing Pinecone index...');

    const index = pc.index(pineconeIndexName);

    let articles;
    try {
        const data = await fs.readFile('scripts/in/articles.json', 'utf-8');
        articles = JSON.parse(data);
    } catch (error) {
        console.error("❌ Error reading or parsing articles.json:", error);
        return;
    }

    const articlesToProcess = articles.slice(0, 20); 

    let vectors = [];
    let chunkCounter = 0;

    for (let i = 0; i < articlesToProcess.length; i++) {
        const article = articlesToProcess[i];
        const title = article.title || `Untitled-${i}`;
        const url = article.url || 'unknown';

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 2000,
            chunkOverlap: 400,
        });

        const fullText = article.content;
        const cutoff = Math.min(50000, Math.floor(0.7 * fullText.length));
        const text = fullText.substring(0, cutoff);
        const chunks = await textSplitter.splitText(text);

        for (let j = 0; j < chunks.length; j++) {
            const chunk = chunks[j];

            console.log(`🔹 Embedding chunk ${j + 1}/${chunks.length} of article ${i + 1}/${articlesToProcess.length}: "${title}"`);
            
            try {
                const res = await openai.embeddings.create({
                    model: "text-embedding-3-small",
                    input: chunk,
                });
                const embedding = res.data[0].embedding;

                vectors.push({
                    id: `chunk-${chunkCounter}`,
                    values: embedding,
                    metadata: {
                        source: `article-${i}`,
                        title: title,
                        url: url,
                        chunk_index: j,
                        text: chunk,
                    },
                });
                chunkCounter++;
            } catch (e) {
                console.error(`Error embedding chunk ${j} of article ${i}:`, e);
            }
        }
    }
    
    console.log(`\n🔹 Upserting ${vectors.length} vectors into Pinecone...`);
    
    for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
        const batch = vectors.slice(i, i + BATCH_SIZE);
        try {
            await index.upsert(batch);
            console.log(`   - Upserted batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(vectors.length / BATCH_SIZE)}`);
        } catch (e) {
            console.error(`Error upserting batch starting at index ${i}:`, e);
        }
    }

    console.log(`\n✅ Stored ${vectors.length} chunks from ${articlesToProcess.length} articles into Pinecone index: ${pineconeIndexName}`);
}

runIngestion().catch(console.error);