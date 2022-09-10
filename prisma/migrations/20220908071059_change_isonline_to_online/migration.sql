/*
  Warnings:

  - You are about to drop the column `is_online` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_online",
ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false;
