-- CreateTable
CREATE TABLE "PrivateMessege" (
    "id" TEXT NOT NULL,
    "privateRoomId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PrivateMessege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateRoom" (
    "id" TEXT NOT NULL,

    CONSTRAINT "PrivateRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PrivateRoomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PrivateRoomToUser_AB_unique" ON "_PrivateRoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PrivateRoomToUser_B_index" ON "_PrivateRoomToUser"("B");

-- AddForeignKey
ALTER TABLE "PrivateMessege" ADD CONSTRAINT "PrivateMessege_privateRoomId_fkey" FOREIGN KEY ("privateRoomId") REFERENCES "PrivateRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessege" ADD CONSTRAINT "PrivateMessege_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrivateRoomToUser" ADD CONSTRAINT "_PrivateRoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PrivateRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrivateRoomToUser" ADD CONSTRAINT "_PrivateRoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
