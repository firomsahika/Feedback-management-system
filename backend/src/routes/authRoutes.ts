import { Router, Request, Response } from "express";
import { loginUser, registerUser, allUser } from "../controllers/authController";

const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get("/all", allUser)

export default router;