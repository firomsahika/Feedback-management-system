import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createFeedback, createFeedbackParameter, getAllFeedbackParameters, getFeedbackParameterById } from "../models/feedbackModel"
// import { getAuth } from "your-auth-lib"; // Use your authentication middleware (JWT, Passport, etc.)

export const createFeedbackParameterController = async (req: Request, res: Response):Promise<void> => {
  const { parameterName, parameterType, courseName, teacherName } = req.body;

  try {
    // Ensure only Admin can create feedback parameters
    const user = req.user; 

    if (!user || user.role !== "admin") {
      res.status(403).json({ message: "Access Denied. Admins only." });
      return; // ✅ Required for void return
    }

    const feedbackParameter = await createFeedbackParameter({
      parameterName,
      parameterType,
      courseName,
      teacherName,
    });

     res.status(201).json(feedbackParameter);
  } catch (error) {
    console.error("❌ Error while creating feedback parameter:", error);
    res.status(500).json({ error: error });
  }
};

// Controller for creating Feedback (Student feedback)
export const createFeedbackController = async (req: Request, res: Response): Promise<void> => {
  const { rating, comment } = req.body;
  const { parameterId } = req.params;

  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const student = await prisma.student.findUnique({
      where: { userId: user.id },
    });

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const feedback = await createFeedback(student.id, parameterId, rating, comment);
    res.status(201).json(feedback);
    return;
  } catch (error) {
    console.error("❌ Error while creating feedback:", error);
    res.status(500).json({ error });
    return;
  }
};


// Controller to get all Feedback Parameters (Admin only)
export const getAllFeedbackParametersController = async (req: Request, res: Response) => {
  try {
    const feedbackParameters = await getAllFeedbackParameters();
    return res.status(200).json(feedbackParameters);
  } catch (error) {
    console.error("❌ Error while fetching all feedback parameters:", error);
    res.status(500).json({ error: error });
  }
};

// Controller to get Feedback Parameter by ID
export const getFeedbackParameterByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const feedbackParameter = await getFeedbackParameterById(id);
    if (!feedbackParameter) {
      return res.status(404).json({ message: "Feedback Parameter not found" });
    }

    return res.status(200).json(feedbackParameter);
  } catch (error) {
    console.error("❌ Error while fetching feedback parameter:", error);
    res.status(500).json({ error: error });
  }
};
