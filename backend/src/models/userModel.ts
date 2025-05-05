import prisma from "../config/prisma";
import { Role } from "@prisma/client";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

// create user
export const createUser = async (user: User, extraData: any) => {
    try {
      // Validate role
      if (user.role !== Role.student && user.role !== Role.admin) {
        throw new Error("Invalid role. Must be STUDENT or ADMIN.");
      }
  
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });
  
      // If role is STUDENT, create associated student data
      if (user.role === Role.student) {
        await prisma.student.create({
          data: {
            userId: newUser.id,
            programme: extraData.programme,
            semester: extraData.semester,
            gender: extraData.gender,
            batch: extraData.batch,
          },
        });
      }
  
      // For ADMIN, no extra data creation needed
      return newUser;
    } catch (error) {
      console.error("❌ Prisma error while creating user:", error);
      throw new Error("Failed to create user");
    }
  };
  
// get all user
export const getAllUser = async () => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        console.error("❌ Prisma error while getting all user:", error);
        throw new Error("Failed to getting all user");
    }
};

// find user by email
export const findUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: { email },
        });
    } catch (error) {
        console.error("❌ Prisma error while finduserbyemail", error);
        throw new Error("Failed to finduser");
    }
};

// Get user by role
export const findUserByRole = async (role: Role) => {
    try {
        return await prisma.user.findMany({
            where: { role },
        });
    } catch (error) {
        console.error("❌ Prisma error while finding users by role:", error);
        throw new Error("Failed to find users by role");
    }
};