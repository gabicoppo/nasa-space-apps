import { Request, Response } from "express";

import { KGService } from "../services/KG.service.js";
import { PineconeService } from "../services/pinecone.service.js";

import { QueryResultContext } from "../../types/index.js";

export class ActionsController {

    static async buildKG(req: Request, res: Response) {

        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ error: "Text is required" });
            }

            const kg = await KGService.extractKnowledgeGraph(text);

            res.status(200).json({ kg });
        } catch (error) {
            console.error("Error in build_KG:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

    }

    static async queryPinecone(req: Request, res: Response) {
        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ error: "Text is required" });
            }
            
            const results = await PineconeService.query(text);

            res.status(200).json({ results });
        } catch (error) {
            console.error("Error in queryPinecone:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

     }

    static async buildKGFromQuery(req: Request, res: Response) {
        try {
            const { query } = req.body;
            if (!query) {
                return res.status(400).json({ error: "Query is required" });
            }

            const result: QueryResultContext[] = await PineconeService.query(query, 3);

            const combinedText = result.map(chunk => chunk.text).join('\n');

            // --- MODIFIED SECTION ---

            // Create a clean array of source objects with title and url
            const sources = result.map(chunk => ({
                title: chunk.title, // Maps the backend field to a clean 'title'
                url: chunk.url
            }));

            const kg = await KGService.extractKnowledgeGraphFromQuery(combinedText, query);

            // Respond with the knowledge graph and the structured sources array
            res.status(200).json({ kg, sources });

        } catch (error) {
            console.error("Error in buildKGFromQuery:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}