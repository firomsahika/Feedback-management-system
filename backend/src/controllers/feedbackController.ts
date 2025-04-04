import { Request,Response } from "express";
import { createFeedback, getAllFeedbacks } from "../models/feedbackModel";


export const submitFeedback = async(req:Request, res:Response) => {
    try {
        const {userId, responses} = req.body;

        const feedback = await createFeedback(userId, responses)

        res.status(201).json({message: "feedback submitted succesfully!!", feedback})
    } catch (err) {
        res.status(500).json({error:"Feedback submision failed!!...."})
    }
}


export const getFeedbacks = async(req:Request, res:Response) => {
    try {

        const feedbacks = await getAllFeedbacks();
        res.status(200).json(feedbacks);

    } catch (err) {
        res.status(500).json({error: "Failed to get feeddbacks!!"})
    }
}