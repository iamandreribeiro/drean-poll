import { Router } from "express";
import { getChoices, postChoice } from "../controllers/choicesController.js";
import { choiceOptionValidation, choiceValidation } from "../middlewares/choiceValidationMiddleware.js";

const router = Router();

router.post("/choice", choiceValidation, postChoice);
router.get("/poll/:id/choice", choiceOptionValidation, getChoices);

export default router;

