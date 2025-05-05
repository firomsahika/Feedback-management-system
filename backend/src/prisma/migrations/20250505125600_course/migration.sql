/*
  Warnings:

  - Added the required column `teacherName` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "TeacherCourse" DROP CONSTRAINT "TeacherCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherCourse" DROP CONSTRAINT "TeacherCourse_teacherId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "teacherName" TEXT NOT NULL;
