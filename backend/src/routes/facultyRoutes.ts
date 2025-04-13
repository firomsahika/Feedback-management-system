import { Router, Request, Response } from "express";
import { registerFaculty, AllFaculty } from "../controllers/facultyController";

const router = Router();

router.post("/register", registerFaculty)
router.get("/faculties", AllFaculty)

export default router;