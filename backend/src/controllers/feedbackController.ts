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
// Proposed change in createFeedbackController
export const createFeedbackController = async (req: Request, res: Response): Promise<void> => {
  const { feedback: feedbackItems } = req.body;

  if (!Array.isArray(feedbackItems) || feedbackItems.length === 0) {
    res.status(400).json({ message: "No feedback items provided or feedback must be an array!" });
    return;
  }

  try {

    const user = req.user;


    if (!user || !user.id) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    // Validate each feedback item
    for (const item of feedbackItems) {
      if (!item.parameterId || !item.rating || typeof item.rating !== 'number' || item.rating < 1 || item.rating > 5) {
        res.status(400).json({ 
          message: "Invalid feedback data",
          details: "Each feedback item must have a valid parameterId and rating (1-5)"
        });
        return;
      }
    }

    // Prepare data for creation
    const dataToCreate = feedbackItems.map(item => ({
      userId: user.id,
      parameterId: item.parameterId,
      rating: item.rating,
      comment: item.comment || "", // Ensure comment is always a string
    }));

    // Create feedback entries
    const result = await prisma.feedback.createMany({
      data: dataToCreate,
      skipDuplicates: true,
    });

    if (result.count === 0) {
      res.status(400).json({ 
        message: "All feedback items have already been submitted",
        details: "You have already provided feedback for these parameters"
      });
      return;
    }

    // Collect the IDs to update feedbackParameter
    const submittedParameterIds = feedbackItems.map(item => item.parameterId);


    await prisma.feedbackParameter.updateMany({
      where: {
        id: {
          in: submittedParameterIds
        },
        // userId: user.id, // assuming feedbackParameter is user-specific
      },
      data: {
        isSubmitted: true
      }
    });

    if (result.count < feedbackItems.length) {
      res.status(201).json({
        message: `Successfully submitted ${result.count} new feedback items. ${feedbackItems.length - result.count} items were already submitted.`,
        submittedCount: result.count,
        skippedCount: feedbackItems.length - result.count
      });
      return;
    }

    res.status(201).json({ 
      message: "All feedback items submitted successfully",
      submittedCount: result.count
    });

  } catch (error: any) {
    console.error("❌ Error while creating feedback:", error);

    if (error.code === 'P2002') {
      res.status(400).json({ 
        message: "Duplicate feedback detected",
        details: "Some feedback items have already been submitted"
      });
    } else if (error.code === 'P2003') {
      res.status(400).json({ 
        message: "Invalid parameter ID",
        details: "One or more parameter IDs do not exist"
      });
    } else {
      res.status(500).json({ 
        message: "Internal server error",
        details: "Please try again later"
      });
    }
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


// backend/controllers/feedbackController.ts

// ... (imports)

export const getAllFeedbackController = async (req: Request, res: Response) => {
  try {
      const feedbacks = await getAllFeedback(); // This returns an array

      if (!feedbacks || feedbacks.length === 0) {
          // It's better to return an empty array for "no feedback" rather than 404,
          // as 404 implies the resource/route doesn't exist.
          // If no feedbacks, return empty array within the data object.
          return res.status(200).json({ message:"No Feedback", data: [] });
      }

      // FIX: Wrap the 'feedbacks' array in a 'data' property
      res.status(200).json({ data: feedbacks });
  } catch (error) {
      console.error("❌ Error while fetching feedbacks:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
