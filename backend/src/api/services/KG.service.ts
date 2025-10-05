import 'dotenv/config';
import OpenAI from 'openai';
import { KnowledgeGraphSchema, KnowledgeGraphJSONSchema, type KnowledgeGraph, Node, Edge } from '../../types/index.js';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class KGService {

    static async extractKnowledgeGraph(text: string): Promise<KnowledgeGraph> {
      // Main function: partition text, process chunks, and merge results
      if (text.length <= 5000) {
        return this.extractKnowledgeGraphFromChunk(text);
      }

      const chunks = this.partitionText(text, 4000, 500);
      const graphs: KnowledgeGraph[] = [];

      for (const chunk of chunks) {
        const graph = await this.extractKnowledgeGraphFromChunk(chunk);


        console.log(JSON.stringify(graph, null, 2));

        graphs.push(graph);
      }

      return this.mergeGraphs(graphs);
    }

    private static partitionText(text: string, chunkSize: number, overlap: number): string[] {
      const chunks: string[] = [];
      let start = 0;

      while (start < text.length) {
        const end = Math.min(start + chunkSize, text.length);
        const chunk = text.slice(start, end);
        chunks.push(chunk);

        // Move start forward by (chunkSize - overlap) for next chunk
        start += chunkSize - overlap;

        // If we've reached the end, break
        if (end === text.length) break;
      }

      return chunks;
    }

    static async extractKnowledgeGraphFromQuery(context: string, query: string): Promise<KnowledgeGraph> {

      const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
          {
              role: 'system',
              content: `You are a highly specialized knowledge graph extraction system. Your task is to analyze a text to build a knowledge graph that SPECIFICALLY answers a user's query.
                  
                  Guidelines for extraction:
                  - **Query-Focused Extraction:** All extracted entities (nodes) and relationships (edges) MUST be directly relevant to answering the user's query. Ignore any information in the text that is not pertinent to the question.
                  - **Identify Key Entities:** Extract the main people, organizations, locations, concepts, etc., that are required to answer the query.
                  - **Create Descriptions:** Write a brief, informative description for each entity based on the provided text.
                  - **Extract Meaningful Relationships:** Define clear, specific relationships between entities that illustrate the answer.
                  - **Use Consistent Naming:** Standardize entity names (e.g., always "Apple Inc." not "Apple").
                  - **Focus on Facts:** Capture only factual information explicitly stated in the text.`,
          },
          {
              role: 'user',
              content: `User Query: "${query}"

                  Source Text:
                  """
                  ${context}
                  """

                  Task: Based on the "Source Text", extract a knowledge graph containing only the entities and relationships necessary to answer the "User Query".`,
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

    private static async extractKnowledgeGraphFromChunk(text: string): Promise<KnowledgeGraph> {
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

    private static mergeGraphs(graphs: KnowledgeGraph[]): KnowledgeGraph {
      const nodeMap = new Map<string, Node>();
      const edges: Edge[] = [];

      for (const graph of graphs) {
        for (const node of graph.nodes) {
          if (!nodeMap.has(node.id)) {
            nodeMap.set(node.id, node);
          }
        }
        edges.push(...graph.edges);
      }

      return {
        nodes: Array.from(nodeMap.values()),
        edges: this.deduplicateEdges(edges),
      };
    }

    private static deduplicateEdges(edges: Edge[]): Edge[] {
      const seen = new Set<string>();
      return edges.filter(edge => {
        const key = `${edge.source}-${edge.relation}-${edge.target}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    static findNodeById(graph: KnowledgeGraph, id: string): Node | undefined {
      return graph.nodes.find(node => node.id === id);
    }

    static getNodeEdges(graph: KnowledgeGraph, nodeId: string): Edge[] {
      return graph.edges.filter(edge => 
        edge.source === nodeId || edge.target === nodeId
      );
    }
}

