import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { KGService } from "../src/api/services/KG.service.js";

interface Article {
  title: string;
  url: string;
  content: string;
}

async function main() {
  try {
    const articlesData = readFileSync('./scripts/in/articles.json', 'utf-8');
    const articles: Article[] = JSON.parse(articlesData);

    if (articles.length === 0) {
      throw new Error('No articles found in articles.json');
    }

    const limit = Math.min(5, articles.length);

    for (let i = 0; i < limit; i++) {
      const article = articles[i];
      const fullText = article.content;
      const cutoff = Math.min(30000, Math.floor(0.6 * fullText.length));
      const text = fullText.substring(0, cutoff);

      console.log(`\n🔹 Processing article ${i + 1}/${limit}: "${article.title}"`);
      console.log(`Full text length: ${fullText.length} chars`);
      console.log(`Using first ${text.length} chars for processing`);

      console.log('⏳ Extracting knowledge graph...');
      const kg = await KGService.extractKnowledgeGraph(text);

      console.log(`✅ Extracted: ${kg.nodes.length} nodes, ${kg.edges.length} edges`);

      const outputData = {
        article: {
          title: article.title,
          url: article.url,
          textLength: text.length
        },
        knowledgeGraph: kg,
        generatedAt: new Date().toISOString()
      };

      const outputPath = `./scripts/out/kg_output_${i + 1}.json`;
      writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
      console.log(`💾 Saved to: ${outputPath}`);
    }

    console.log(`\n✅ Finished processing ${limit} articles.`);

  } catch (error) {
    console.error('❌ Error extracting knowledge graph:', error);
  }
}

main().catch(console.error);
