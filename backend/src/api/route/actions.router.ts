import { Router } from "express";

import { ActionsController } from "../controllers/actions.controller.js";

const router = Router();

router.post("/buildKG", ActionsController.buildKG);

router.post("/queryPinecone", ActionsController.queryPinecone);

router.post("/buildKGFromQuery", ActionsController.buildKGFromQuery);

export default router;