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

            const result: QueryResultContext[] = await PineconeService.query(query, 5);

            let combinedText = '';
            for (const chunk of result) {
                combinedText += chunk.text + '\n';
            }
            // pass the article name and link 

            const kg = await KGService.extractKnowledgeGraphFromQuery(combinedText, query);

            res.status(200).json({ kg });
        } catch (error) {
            console.error("Error in buildKGFromQuery:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}