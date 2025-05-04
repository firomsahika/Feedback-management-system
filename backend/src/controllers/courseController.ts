import { error } from "console";
import { Request, Response } from "express";
import { createCourse, getCourseByName,getAllCourses,getCourseByID } from "models/courseModel";


export const registerCourse = async(req:Request,res:Response) =>{
    try {

        const {courseName, courseCode, courseType} = req.body;

        if(!courseName || !courseCode || !courseType){
            res.status(400).json({
                message:"Please Fill all fields!!"
            })
        }

        // check if course exists
        const existingCourse = await getCourseByName(courseName);

        if(existingCourse){
            res.status(400).json({
                message:"Course already exist!!"
            })
        }

        const newCourse = await createCourse({
            courseName,courseCode, courseType
        })

        res.status(201).json({
            success:true,
            message:"Course registered succesfully!",
            course:newCourse,
        })


    } catch (err) {
        res.status(500).json({
            error:"Internal server error!"
        })
    }
}


export const allCourses = async(req:Request, res:Response) =>{
    try {
        const courses = await getAllCourses();
        
        if(!courses || courses.length===0){
            res.status(404).json({ error: "No courses exist!" });
        }
    } catch (err) {
        res.status(500).json({
            error:"Internal server error!"
        })
    }
}

export const singleCourseByID = async(req:Request, res:Response) =>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({ message: "Course ID is required" });
        }  
        
        const course = await getCourseByID(id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json(course)

    } catch (err) {
        res.status(500).json({
            error:"Internal server error!"
        })
    }
}