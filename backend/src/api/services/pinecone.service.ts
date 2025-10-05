import 'dotenv/config';
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

import { ArticleMetadata, QueryResultContext } from "../../types/index.js";

const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
});
const openai = new OpenAI();

const index = pc.index<ArticleMetadata>(process.env.PINECONE_INDEX_NAME || 'nasa');


export class PineconeService {

  static async query(userInput: string, topK: number = 10): Promise<QueryResultContext[]> {
    console.log(`\n🔍 Searching for: "${userInput}"`);

    let queryEmbedding: number[];

    // 1. Embed the user input
    try {
        const embeddingResponse = await openai.embeddings.create({
            model: OPENAI_EMBEDDING_MODEL,
            input: userInput,
        });
        queryEmbedding = embeddingResponse.data[0].embedding;
        console.log(`✅ User input embedded successfully.`);
    } catch (e) {
        console.error("❌ Error generating embedding for query:", e);
        return []; // Return empty array on failure
    }

    // 2. Query the Pinecone index
    try {
        const queryResults = await index.query({
            vector: queryEmbedding,
            topK: topK,
            includeMetadata: true,
        });

        const contextChunks: QueryResultContext[] = [];

        if (queryResults.matches && queryResults.matches.length > 0) {
            for (const match of queryResults.matches) {
                // typescript moment 
                if (match.metadata && match.metadata.text && match.metadata.title && match.metadata.url) {
                    contextChunks.push({
                        text: match.metadata.text,
                        title: match.metadata.title,
                        url: match.metadata.url,
                        score: match.score || 0,
                    });
                }
            }

            return contextChunks;
        } else {
            console.log("🟡 No matches found for the query.");
            return [];
        }
    } catch (e) {
        console.error("❌ Error querying Pinecone:", e);
        return [];
    }
  }

}

