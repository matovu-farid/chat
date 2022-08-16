import Messege from "../Interfaces/Messege";
import Roompage from "../Interfaces/RoomPage";
import { Prisma } from "../server/db/client";
export async function createMessege(message: Messege, prisma: Prisma) {
  const createMessege = prisma.message.create({
    data: {
      room: {
        connect: { id: message.roomId },
      },
      sender: {
        connect: {
          id: message.senderId,
        },
      },
      text: message.text,
    },
    include: { sender: true, room: true },
  });
  return await createMessege;
}
export async function deleteMessege(messageId: string, prisma: Prisma) {
  const createMessege = prisma.message.delete({
    where: {
      id: messageId,
    },
  });
  return await createMessege;
}
export async function getMesseges(roomId: string, prisma: Prisma) {
  return await prisma.message.findMany({
    where: {
      roomId: roomId,
    },
    include: {
      sender: true,
    },
  });
}
export async function getPaginatedMesseges(roomPage: Roompage, prisma: Prisma) {
  const { roomId, cursor } = roomPage;
  const limit = 8;
  const messegeHistory = await prisma.message.findMany({
    where: {
      roomId: roomId,
    },
    include: {
      sender: true,
    },
    take: limit + 1,
    orderBy: {
      createdAt: "desc",
    },
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
  });
  let nextCursor: string | undefined;
  if (messegeHistory.length > limit) {
    nextCursor = messegeHistory.pop()?.id;
  }
  const reversedMesseges = messegeHistory.reverse()
  return { messegeHistory, nextCursor };
}
