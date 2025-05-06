import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorizeRole } from "../middlewares/authorizeRole";
import { createFeedbackController, createFeedbackParameterController } from "../controllers/feedbackController"

const router = Router();

router.post("/create-parameter", authenticate, authorizeRole("admin"), createFeedbackParameterController )
router.post("/submit-feedback", authenticate, createFeedbackController)


export default router;

