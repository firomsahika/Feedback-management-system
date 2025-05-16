import { Response, Request } from 'express';

import prisma from '../config/prisma';
import { CourseType, FeedbackParameter, Student, User } from '@prisma/client'; // Alias Student to avoid confusion

export interface FeedbackParameters {
  id?: string;
  parameterName: string;
  parameterType: CourseType;
  courseName: string;
  teacherName: string;
}

export interface Feedback {
  id: string;
  userId: string;
  parameterId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  user?: User;
  parameter?: FeedbackParameter;
}

export const createFeedbackParameter = async (
  parameter: FeedbackParameters
) => {
  try {
    return await prisma.feedbackParameter.create({
      data: {
        parameterName: parameter.parameterName,
        parameterType: parameter.parameterType,
        courseName: parameter.courseName,
        teacherName: parameter.teacherName,
      },
    });
  } catch (error) {
    console.error('❌ Prisma error while creating feedback parameter:', error);
    throw new Error('Failed to create feedback parameter');
  }
};

// Create Feedback (Student giving feedback)
export const createFeedback = async (
  userId: string,
  parameterId: string,
  rating: number,
  comment?: string
) => {
  try {
    return await prisma.feedback.create({
      data: {
        userId,
        parameterId,
        rating,
        comment,
      },
    });
  } catch (error) {
    console.error('❌ Prisma error while creating feedback:', error);
    throw new Error('Failed to create feedback');
  }
};

// Get All Feedback Parameters (Admin only)
export const getAllFeedbackParameters = async () => {
  try {
    return await prisma.feedbackParameter.findMany({
      where:{
        isActive:true,
        isSubmitted:false,
      }
    });
  } catch (error) {
    console.error('❌ Error while fetching feedback parameters:', error);
    throw new Error('Failed to fetch feedback parameters');
  }
};

// Get Feedback Parameter by ID
export const getFeedbackParameterById = async (id: string) => {
  try {
    return await prisma.feedbackParameter.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('❌ Error while fetching feedback parameter by ID:', error);
    throw new Error('Failed to fetch feedback parameter');
  }
};

// Get Feedback
export const getAllFeedback = async () => {
  try {
    return await prisma.feedback.findMany({
      include: {
        user: true,
        parameter: true,
      },
    });
  } catch (error) {
    console.error('❌ Error while fetching feedback parameters:', error);
    throw new Error('Failed to fetch feedback parameters');
  }
};
