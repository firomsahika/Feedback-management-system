import { Router, Request, Response } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorizeRole } from "../middlewares/authorizeRole";
import { createFeedbackController, createFeedbackParameterController, getAllFeedbackParametersController, getAllFeedbackController } from "../controllers/feedbackController"

const router = Router();

router.post("/create-parameter", authenticate, authorizeRole("admin"), createFeedbackParameterController )
router.get("/parameters", getAllFeedbackParametersController )
router.post("/submit-feedback/", authenticate, createFeedbackController)
router.get("/all", getAllFeedbackController)


export default router;

