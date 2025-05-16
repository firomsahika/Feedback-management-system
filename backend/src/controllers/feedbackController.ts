import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createFeedback, createFeedbackParameter, getAllFeedbackParameters, getFeedbackParameterById, getAllFeedback } from "../models/feedbackModel"


export const createFeedbackParameterController = async (req: Request, res: Response):Promise<void> => {
  const { parameterName, parameterType, courseName, teacherName } = req.body;

  try {
   
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
  const { feedback } = req.body;

  if (!Array.isArray(feedback)) {
    res.status(400).json({ message: "Feedback must be an array!" });
    return;
  }

  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const existing = await prisma.feedback.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (existing) {
      res.status(400).json({ message: "Oops, You have already submitted this feedback!!" });
      return;
    }

    // Create feedback entries
    const createdFeedbacks = await Promise.all(
      feedback.map(async (item) => {
        const created = await createFeedback(user.id, item.parameterId, item.rating, item.comment);

        // 👉 Mark the feedback parameter as submitted
        await prisma.feedbackParameter.update({
          where: { id: item.parameterId },
          data: { isSubmitted: true },
        });

        return created;
      })
    );

    res.status(201).json({ message: "Feedback created successfully", data: createdFeedbacks });

  } catch (error) {
    console.error("❌ Error while creating feedback:", error);
    res.status(500).json({ error });
    return;
  }
};

// Controller to get all Feedback Parameters (Admin only)
export const getAllFeedbackParametersController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const feedbackParameters = await getAllFeedbackParameters();
    return res.status(200).json(feedbackParameters);
  } catch (error) {
    console.error("❌ Error while fetching all feedback parameters:", error);
    return res.status(500).json({ error: error });
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


export const getAllFeedbackController = async (req: Request, res: Response) => {
  try {
    const feedbacks = await getAllFeedback();

    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: "Feedback not found!" });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("❌ Error while fetching feedbacks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

