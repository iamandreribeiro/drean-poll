import { Router } from "express";
import { pollResultValidation, pollValidation } from "../middlewares/pollValidationMiddleware.js";
import { getPollResult, getPolls, postPoll } from "../controllers/pollsController.js";

const router = Router();

router.post("/poll", pollValidation, postPoll);
router.get("/poll", getPolls);
router.get("/poll/:id/result", pollResultValidation, getPollResult);

export default router;