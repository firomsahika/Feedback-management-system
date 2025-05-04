import { Router } from "express";
import { registerCourse, allCourses, singleCourseByID } from "controllers/courseController";

const router = Router();

router.post("/create-course", registerCourse);
router.get("/all-courses", allCourses);
router.get("/courses/:id", singleCourseByID);

export default router;
