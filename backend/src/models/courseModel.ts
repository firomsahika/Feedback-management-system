import { CourseType } from "@prisma/client";
import prisma from "../config/prisma";

export interface Course{
    id? : string
    courseName:string
    courseCode:string
    courseType:CourseType,
    teacherName:string,
}


export const createCourse = async(course: Course) => {
    try {
        return await prisma.course.create({
            data:{
                id:course.id,
                courseName:course.courseName,
                courseCode:course.courseCode,
                courseType:course.courseType,
                teacherName:course.teacherName,
            },
        })
    } catch (error) {
        console.error("❌ Prisma error while creating class:", error);
        throw new Error("Failed to create class");
    }
}

export const getAllCourses = async() =>{
    try {
       return await prisma.course.findMany();
    } catch (error) {
        console.error("❌ Prisma error while getting course:", error);
        throw new Error("Failed to getcourses");
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

export const deleteCourse = async(id:string)=>{
    try {
        return await prisma.course.delete({
            where:{id}
        })
    } catch (error) {
        console.error("❌ Prisma error while deleting course:", error);
        throw new Error("Failed to delete course");    }
}
