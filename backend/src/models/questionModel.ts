import prisma from "../config/prisma";

export interface Question{
    text: string, 
    type: "rating" | "yes_no" | "text"
}


export const createQuestion = async(question:Question) =>{
    try {
        await prisma.FeedbackQuestion.create({

        })
    } catch (error) {
        console.error("❌ Prisma error while getting feedback:", error);
        throw new Error("Failed to get all feedback");
    }
}