import { CourseType } from "@prisma/client";
import prisma from "config/prisma";

export interface Course{
    id? : string
    courseName:string
    courseCode:string
    courseType:CourseType
}


export const createCourse = async(course: Course) => {
    try {
        return await prisma.course.create({
            data:{
                id:course.id,
                courseName:course.courseName,
                courseCode:course.courseCode,
                courseType:course.courseType,
                creator:{
                   connect:{    
                    id:"creator id placeholder"
                   },
                },
            },
        })
    } catch (error) {
        console.error("❌ Prisma error while creating class:", error);
        throw new Error("Failed to create class");
    }
}

export const getAllCourses = async() =>{
    try {
        return await prisma.course.findMany({
            include:{
                creator:true,
            }
        })
    } catch (error) {
        console.error("❌ Prisma error while creating class:", error);
        throw new Error("Failed to create class");
    }
}

export const getCourseByID = async(id:string) =>{
    try {
        return await prisma.course.findUnique({
            where:{id}
        })
    } catch (error) {
        console.error("❌ Prisma error while creating class:", error);
        throw new Error("Failed to create class");
    }
}

export const getCourseByName = async(courseName:string) =>{
    try {
        return await prisma.course.findFirst({
           where:{courseName} 
        })
    } catch (error) {
        console.error("❌ Prisma error while creating class:", error);
        throw new Error("Failed to create course");
    }
}