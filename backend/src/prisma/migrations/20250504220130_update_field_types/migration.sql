/*
  Warnings:

  - A unique constraint covering the columns `[courseName]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `courseType` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseType",
ADD COLUMN     "courseType" "CourseType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseName_key" ON "Course"("courseName");
