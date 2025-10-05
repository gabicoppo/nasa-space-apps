import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { KGService } from "./api/services/KG.service.js";

interface Article {
  title: string;
  url: string;
  content: string;
}

async function main() {
  try {
    // Load articles from JSON file
    const articlesData = readFileSync('./src/articles.json', 'utf-8');
    const articles: Article[] = JSON.parse(articlesData);
    
    // Get first article's content
    if (articles.length === 0) {
      throw new Error('No articles found in articles.json');
    }
    
    const fullText = articles[0].content;
    const text = fullText.substring(0, 24000); // Get first 24,000 characters
    console.log(`Processing article: "${articles[0].title}"`);
    console.log(`Full text length: ${fullText.length} characters`);
    console.log(`Using first ${text.length} characters for processing`);
    
    console.log('Starting knowledge graph extraction...');
    const kg = await KGService.extractKnowledgeGraph(text);
    
    console.log('Knowledge Graph extracted successfully:');
    console.log(`Found ${kg.nodes.length} nodes and ${kg.edges.length} edges`);
    
    // Write to JSON file
    const outputData = {
      article: {
        title: articles[0].title,
        url: articles[0].url,
        textLength: text.length
      },
      knowledgeGraph: kg,
      generatedAt: new Date().toISOString()
    };
    
    const outputPath = './kg_output.json';
    writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    console.log(`Knowledge graph saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error extracting knowledge graph:', error);
  }
}

main().catch(console.error);