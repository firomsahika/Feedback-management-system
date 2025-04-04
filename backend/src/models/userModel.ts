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
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
            }
        })

        switch (user.role) {
            case Role.STUDENT:
                await prisma.student.create({
                    data: {
                        userId: newUser.id,
                        programme: extraData.programme,
                        semester: extraData.semester,
                        gender: extraData.gender,
                        batch: extraData.batch,
                    }
                });
                break;

            case Role.INSTRUCTOR:
                await prisma.instructor.create({
                    data: {
                        userId: newUser.id,
                        name: extraData.name,
                        course: extraData.course,
                        department: extraData.department,
                    }
                });
                break;

            case Role.FACULTY:
                await prisma.faculty.create({
                    data: {
                        userId: newUser.id,
                        name: extraData.name,
                        specialization: extraData.specialization,
                        department: extraData.department,
                    }
                });
                break;
                
            case Role.DEPARTMENT:
                await prisma.department.create({
                    data: {
                        userId: newUser.id,
                        name: extraData.name,
                        faculty: extraData.faculty,
                    }
                });
                break;

            default:
                throw new Error("Invalid role specified.");
        }
    } catch (error) {
        console.error("❌ Prisma error while creating user:", error);
        throw new Error("Failed to create user");
    }
}

// get all user

export const getAllUser = async () => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        console.error("❌ Prisma error while getting all user:", error);
        throw new Error("Failed to getting all user");
    }
}

// find user by email

export const findUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: { email },
        })
    } catch (error) {
        console.error("❌ Prisma error while finduserbyemail", error);
        throw new Error("Failed to finduser");
    }
}

//Get user by role

export const findUserByRole = async (role: Role) => {
    try {
        return await prisma.user.findMany({
            where: { role },
        })
    } catch (error) {
        console.error("❌ Prisma error while finding users by role:", error);
        throw new Error("Failed to find users by role");
    }
}

