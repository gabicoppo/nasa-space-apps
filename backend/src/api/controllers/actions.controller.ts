import { Request, Response } from "express";

import { KGService } from "../services/KG.service.js";

export class ActionsController {

    static async buildKG(req: Request, res: Response) {

        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ error: "Text is required" });
            }

            const kg = await KGService.extractKnowledgeGraph(text);

            res.status(200).json({ knowledgeGraph: kg });
        } catch (error) {
            console.error("Error in build_KG:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

    }

}