/*
  Warnings:

  - You are about to drop the `TextSafe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TextSafe" DROP CONSTRAINT "TextSafe_userId_fkey";

-- DropTable
DROP TABLE "TextSafe";

-- CreateTable
CREATE TABLE "SafeNote" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SafeNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SafeNote" ADD CONSTRAINT "SafeNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
