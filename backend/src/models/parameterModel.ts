import prisma from "config/prisma";
import { CourseType } from "@prisma/client";


export interface Parameter{
    id?:string
    parameterName:string
    parameterType: CourseType
    
}

export const createParameter = async(parameter:Parameter) =>{
    try {
        return await prisma.feedbackParameter.create({
            data:{
                id:parameter.id,
                parameterName:parameter.parameterName,
                parameterType:parameter.parameterType,
                creator:{
                   connect:{
                    id:"creator id placeholder"
                   }
                }
            }
        })
    } catch (error) {
        console.error("❌ Prisma error while creating class:", error);
        throw new Error("Failed to create class");
    }
}

export const getAllParameter = async() =>{
    try {
        return await prisma.feedbackParameter.findMany({
            include:{
                creator:true,
            }
        })
    } catch (error) {
        console.error("❌ Prisma error while creating class:", error);
        throw new Error("Failed to create class");
    }
}

export const getParameterById = async(id:string) =>{
    try {
        return await prisma.feedbackParameter.findUnique({
            where:{id}
        })
    } catch (error) {
        console.error("❌ Prisma error while creating class:", error);
        throw new Error("Failed to create class");
    }
}