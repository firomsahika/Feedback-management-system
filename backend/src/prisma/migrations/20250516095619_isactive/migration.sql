/*
  Warnings:

  - You are about to drop the column `isActive` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "FeedbackParameter" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
