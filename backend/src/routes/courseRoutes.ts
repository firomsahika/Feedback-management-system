import { Router } from "express";
import { registerCourse, allCourses, removeCourse } from "../controllers/courseController";


const router = Router();

router.post('/create', registerCourse);
router.get('/all', allCourses);
router.delete('/:id', removeCourse)
// router.get("/:id", singleCourseByID);

export default router;
