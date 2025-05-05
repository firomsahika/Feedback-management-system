-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "programme" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "batch" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
