import { Router } from "express";
import { postVote } from "../controllers/votesController.js";
import { voteValidation } from "../middlewares/voteValidationMiddleware.js";

const router = Router();

router.post("/choice/:id/vote", voteValidation, postVote);

export default router;