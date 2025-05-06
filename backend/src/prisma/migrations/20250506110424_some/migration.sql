/*
  Warnings:

  - You are about to drop the column `createdBy` on the `FeedbackParameter` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `FeedbackParameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherName` to the `FeedbackParameter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FeedbackParameter" DROP CONSTRAINT "FeedbackParameter_createdBy_fkey";

-- AlterTable
ALTER TABLE "FeedbackParameter" DROP COLUMN "createdBy",
ADD COLUMN     "courseName" TEXT NOT NULL,
ADD COLUMN     "teacherName" TEXT NOT NULL;
