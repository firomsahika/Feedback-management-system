/*
  Warnings:

  - You are about to drop the column `facultyId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `batch` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `departmentName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facultyName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instructorDepartment` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instructorName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `programme` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_facultyId_fkey";

-- DropIndex
DROP INDEX "Faculty_name_key";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "facultyId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "description",
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "batch",
DROP COLUMN "course",
DROP COLUMN "departmentName",
DROP COLUMN "description",
DROP COLUMN "facultyName",
DROP COLUMN "gender",
DROP COLUMN "instructorDepartment",
DROP COLUMN "instructorName",
DROP COLUMN "programme",
DROP COLUMN "semester",
DROP COLUMN "studentId";

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "programme" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "gender" TEXT,
    "batch" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userId_key" ON "Instructor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_userId_key" ON "Department"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_userId_key" ON "Faculty"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
