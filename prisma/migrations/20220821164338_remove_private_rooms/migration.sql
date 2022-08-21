/*
  Warnings:

  - You are about to drop the column `privateRoomId` on the `PrivateMessege` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PrivateMessege` table. All the data in the column will be lost.
  - You are about to drop the `PrivateRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PrivateRoomToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receiverId` to the `PrivateMessege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `PrivateMessege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `PrivateMessege` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PrivateMessege" DROP CONSTRAINT "PrivateMessege_privateRoomId_fkey";

-- DropForeignKey
ALTER TABLE "PrivateMessege" DROP CONSTRAINT "PrivateMessege_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PrivateRoomToUser" DROP CONSTRAINT "_PrivateRoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PrivateRoomToUser" DROP CONSTRAINT "_PrivateRoomToUser_B_fkey";

-- AlterTable
ALTER TABLE "PrivateMessege" DROP COLUMN "privateRoomId",
DROP COLUMN "userId",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- DropTable
DROP TABLE "PrivateRoom";

-- DropTable
DROP TABLE "_PrivateRoomToUser";

-- AddForeignKey
ALTER TABLE "PrivateMessege" ADD CONSTRAINT "PrivateMessege_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessege" ADD CONSTRAINT "PrivateMessege_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
