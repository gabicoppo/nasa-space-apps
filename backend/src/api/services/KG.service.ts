import 'dotenv/config';
import OpenAI from 'openai';
import { KnowledgeGraphSchema, KnowledgeGraphJSONSchema, type KnowledgeGraph } from '../../types/index.js';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class KGService {

    static async extractKnowledgeGraph(text: string): Promise<KnowledgeGraph> {
      const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
          {
              role: 'system',
              content: `You are an expert knowledge graph extraction system. Your task is to analyze text and build comprehensive, high-quality knowledge graphs.
                  Guidelines for extraction:
                  - Identify MAIN entities only (people, organizations, locations, concepts, events, products)
                  - Create detailed, informative descriptions for each entity (2-3 sentences when possible)
                  - Extract meaningful relationships with clear, specific relation types
                  - Assign confidence scores based on how explicitly the relationship is stated in the text
                  - Use consistent naming (e.g., always "Apple Inc." not sometimes "Apple")
                  - Capture both direct relationships and important implicit connections
                  - Focus on factual information, avoid speculative relationships`,
          },
          {
              role: 'user',
              content: `Extract a knowledge graph from the following text:\n\n${text}`,
          },
          ],
          temperature: 0.2,
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'knowledge_graph',
              strict: true,
              schema: KnowledgeGraphJSONSchema,
            },
          },
      });

      const result = completion.choices[0].message.content;

      console.log(result);

      if (!result) throw new Error('No response from OpenAI');

      // Parse and validate with Zod
      const parsed = JSON.parse(result);
      return KnowledgeGraphSchema.parse(parsed);
    }
}