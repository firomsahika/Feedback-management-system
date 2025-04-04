import { Router } from "express";
import { submitFeedback, getFeedbacks } from "../controllers/feedbackController";

const router = Router();

router.post("/create", submitFeedback)
router.get("/", getFeedbacks)

export default router;