/*
  Warnings:

  - Changed the type of `courseType` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseType",
ADD COLUMN     "courseType" TEXT NOT NULL;
