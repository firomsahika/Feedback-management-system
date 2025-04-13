import prisma from "../config/prisma";

export interface Faculty {
    id?: string;
    userId: number;
    facultyName: string;
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
                facultyName: faculty.facultyName,
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

export const findFacultyByName = async (facultyName: string) => {
    try {
        return await prisma.faculty.findFirst({
            where: { facultyName: facultyName }
        })
    } catch (error) {
        console.error("❌ Prisma error while creating faculty:", error);
        throw new Error("Failed to create faculty");
    }
}




