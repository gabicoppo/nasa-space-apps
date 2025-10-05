import 'dotenv/config'; 
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import fs from 'fs/promises';

// ──────────────────────────────
// Setup
// ──────────────────────────────
const BATCH_SIZE = 100; // Pinecone recommends batching upserts

// Initialize clients
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
});
const openai = new OpenAI();

/**
 * Loads and processes articles, then upserts them into Pinecone.
 */
async function runIngestion() {
    console.log('🔹 Initializing Pinecone index...');

    const index = pc.index(process.env.PINECONE_INDEX_NAME || 'nasa');

    // 2. Load Articles
    let articles;
    try {
        const data = await fs.readFile('articles.json', 'utf-8');
        articles = JSON.parse(data);
    } catch (error) {
        console.error("❌ Error reading or parsing articles.json:", error);
        return;
    }

    // Limit to the first 5 articles, matching the Python script
    const articlesToProcess = articles.slice(0, 5); 

    // Initialize list for all vectors (Pinecone format)
    let vectors = [];
    let chunkCounter = 0;

    // 3. Process each article
    for (let i = 0; i < articlesToProcess.length; i++) {
        const article = articlesToProcess[i];
        const title = article.title || `Untitled-${i}`;
        const url = article.url || 'unknown';

        // Split into chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1500,
            chunkOverlap: 300,
        });
        const chunks = await textSplitter.splitText(article.content);

        // Embed chunks
        for (let j = 0; j < chunks.length; j++) {
            const chunk = chunks[j];

            console.log(`🔹 Embedding chunk ${j + 1}/${chunks.length} of article ${i + 1}/${articlesToProcess.length}: "${title}"`);
            
            try {
                const res = await openai.embeddings.create({
                    model: "text-embedding-3-small",
                    input: chunk,
                });
                const embedding = res.data[0].embedding;

                // Prepare for Pinecone upsert
                vectors.push({
                    id: `chunk-${chunkCounter}`,
                    values: embedding,
                    metadata: {
                        source: `article-${i}`,
                        title: title,
                        url: url,
                        chunk_index: j,
                        text: chunk, // Store text in metadata for RAG retrieval
                    },
                });
                chunkCounter++;
            } catch (e) {
                console.error(`Error embedding chunk ${j} of article ${i}:`, e);
            }
        }
    }

    
    // 4. Store in Pinecone (Upsert in Batches)
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

    console.log(`\n✅ Stored ${vectors.length} chunks from ${articlesToProcess.length} articles into Pinecone index: ${PINECONE_INDEX_NAME}`);
}

runIngestion().catch(console.error);