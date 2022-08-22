import Messege, { Conversation, PaginatedConversation, PrivateMessege } from "../Interfaces/Messege";
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
export async function createPrivateMessege(message: PrivateMessege, prisma: Prisma) {
  const createMessege = prisma.privateMessege.create({
    data: {
      sender: {
        connect: { id: message.senderId },
      },
      receiver: {
        connect: {
          id: message.receiverId,
        },
      },
      text: message.text,
    },
    include: { sender: true },
  });
  return await createMessege;
}
export async function deletePrivateMessege(messageId: string, prisma: Prisma) {
  const createMessege = prisma.privateMessege.delete({
    where: {
      id: messageId,
    },
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
export async function getConversation(conversation:Conversation,prisma:Prisma){
  const {senderId,receiverId} = conversation
  return prisma.privateMessege.findMany({
    where: {
      senderId: senderId,
      receiverId: receiverId
    }
  })
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
  
  return { messegeHistory, nextCursor };
}
export async function getPaginatedConversation(conversation: PaginatedConversation, prisma: Prisma) {
  const { senderId,receiverId, cursor } = conversation;
  const limit = 8;
  const messegeHistory = await prisma.privateMessege.findMany({
    where: {
      senderId: senderId,
      receiverId:receiverId
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
  
  return { messegeHistory, nextCursor };
}
