import { z } from 'zod';

// Zod schemas (for runtime validation)
export const NodeSchema = z.object({
  id: z.string().describe('Unique identifier for the node'),
  type: z.string().describe('Type of entity (person, organization, concept, etc.)'),
  description: z.string().describe('Brief description of the entity'),
});

export const EdgeSchema = z.object({
  source: z.string().describe('ID of the source node'),
  target: z.string().describe('ID of the target node'),
  relation: z.string().describe('Type of relationship'),
  description: z.string().describe('Detailed description of the relationship'),
});

export const KnowledgeGraphSchema = z.object({
  nodes: z.array(NodeSchema).describe('List of entities in the graph'),
  edges: z.array(EdgeSchema).describe('List of relationships between entities'),
});

// TypeScript types (inferred from schemas)
export type Node = z.infer<typeof NodeSchema>;
export type Edge = z.infer<typeof EdgeSchema>;
export type KnowledgeGraph = z.infer<typeof KnowledgeGraphSchema>;

// JSON Schema for OpenAI (generated once, reused everywhere)
export const KnowledgeGraphJSONSchema = {
  type: 'object',
  properties: {
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          type: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['id', 'type', 'description'],
        additionalProperties: false,
      },
    },
    edges: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          source: { type: 'string' },
          target: { type: 'string' },
          relation: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['source', 'target', 'relation', 'description'],
        additionalProperties: false,
      },
    },
  },
  required: ['nodes', 'edges'],
  additionalProperties: false,
} as const;
