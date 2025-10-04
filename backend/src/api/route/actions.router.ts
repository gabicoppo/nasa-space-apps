import { Router } from "express";

import { ActionsController } from "../controllers/actions.controller.js";

const router = Router();

router.post("/buildKG", ActionsController.buildKG);

export default router;