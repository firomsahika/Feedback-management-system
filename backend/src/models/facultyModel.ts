import prisma from "../config/prisma";

export interface Faculty {
    id?: string;
    userId: number;
    name: string;
    description?: string;
}

export interface Department {
    id?: string
    name: string
    facultyId: string
    faculty: Faculty;
}


export const createFaculty = async (faculty: Faculty) => {
    try {
        return await prisma.faculty.create({
            data: {
                userId: faculty.userId,
                name: faculty.name,
                description: faculty.description,
            },

        });
    } catch (error) {
        console.error("❌ Prisma error while creating faculty:", error);
        throw new Error("Failed to create faculty");
    }
};




// get all faculty

export const getAllFaculty = async () => {
    try {
        return await prisma.faculty.findMany();
    } catch (error) {
        console.error("❌ Prisma error while creating faculty:", error);
        throw new Error("Failed to create faculty");
    }
}

// find faculty by name

export const findFacultyByName = async (name: string) => {
    try {
        return await prisma.faculty.findFirst({
            where: { name }
        })
    } catch (error) {
        console.error("❌ Prisma error while creating faculty:", error);
        throw new Error("Failed to create faculty");
    }
}




