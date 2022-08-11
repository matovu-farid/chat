/*
  Warnings:

  - You are about to drop the column `serverId` on the `Room` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Room_serverId_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "serverId";
