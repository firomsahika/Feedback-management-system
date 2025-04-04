import prisma from "../config/prisma";


export interface Feedback {
    userId: number,
    responses: {
        questionId: number;
        rating?: number;
        yesNo?: boolean;
        textAnswer?: string
    }
}


export const createFeedback = async (userId: number, responses: { questionId: number; rating?: number; yesNo?: boolean; textAnswer?: string }[]) => {
    try {
        await prisma.feedbackSubmission.create({
            data: {
                userId,
                responses: {
                    create: responses.map((response) => ({
                        questionId: response.questionId,
                        rating: response.rating ?? null,
                        yesNo: response.yesNo ?? null,
                        textAnswer: response.textAnswer ?? null,
                    }))
                }
            },
            include: { responses: true },
        })
    } catch (error) {
        console.error("❌ Prisma error while creating feedback:", error);
        throw new Error("Failed to create feedback");
    }
}


export const getAllFeedbacks = async () => {
    try {
        await prisma.feedbackSubmission.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true }, // Get user info
                },
                responses: {
                    include: {
                        question: {
                            select: { id: true, text: true, type: true }, // Get question details
                        },
                    },
                },
            },
            orderBy: {
                submittedAt: "desc",
            },
        })
    } catch (error) {
        console.error("❌ Prisma error while getting feedback:", error);
        throw new Error("Failed to get all feedback");
    }
}

