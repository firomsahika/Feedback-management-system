import prisma from "config/prisma";

export interface Class {
  id?: string;
  className: string;
  accessCode: string;   
}

export const createClass = async (classData: Class) => {
  try {
    return await prisma.class.create({
      data: {
        id: classData.id,
        className: classData.className,
        accessCode: classData.accessCode,
        creator: {
          connect: {
            id: "creator-id-placeholder", // Replace with the actual creator ID
          },
        },
      },
    });
  } catch (error) {
    console.error("❌ Prisma error while creating class:", error);
    throw new Error("Failed to create class");
  }
}

export const getAllClasses = async () => {
  try {
    return await prisma.class.findMany({
      include: {
        creator: true,
      },
    });
  } catch (error) {
    console.error("❌ Prisma error while fetching classes:", error);
    throw new Error("Failed to fetch classes");
  }
}

// get single class by id
export const getClassById = async (id: string) => {
  try {
    return await prisma.class.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("❌ Prisma error while fetching class:", error);
    throw new Error("Failed to fetch class");
  }
}