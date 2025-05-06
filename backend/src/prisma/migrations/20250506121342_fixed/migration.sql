/*
  Warnings:

  - You are about to drop the column `teacherCourseId` on the `Feedback` table. All the data in the column will be lost.
  - Changed the type of `studentId` on the `Feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_teacherCourseId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherCourse" DROP CONSTRAINT "TeacherCourse_classId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "teacherCourseId",
DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
