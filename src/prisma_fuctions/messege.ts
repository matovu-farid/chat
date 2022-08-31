import Messege, { Conversation, PaginatedConversation, PrivateMessege } from "../Interfaces/Messege";
import Roompage from "../Interfaces/RoomPage";
import { Prisma,prisma } from "../server/db/client";

export async function deletePrivateMessege(messageId: string, prisma: Prisma) {
  const deleteMessege = prisma.privateMessege.delete({
    where: {
      id: messageId,
    },
  });
  return await deleteMessege;
}

export async function deleteMessege(messageId: string, prisma: Prisma) {
  const deleteMesseged = prisma.message.delete({
    where: {
      id: messageId,
    },
  });
  return await deleteMesseged;
}
export async function saveMessege(messege: Messege){
  return prisma.message.create({
    data: messege,

    include: {
      sender: true
    }
  });
}
export async function savePrivateMessege(messege: PrivateMessege){
  console.log("From savePrivateMessege\n",messege)
  return prisma.privateMessege.create({
    data: messege,
    include: {
      sender: true
    },
  });
  
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
  messegeHistory.reverse()
  
  return { messegeHistory, nextCursor };
}
export async function getPaginatedConversation(conversation: PaginatedConversation, prisma: Prisma) {
  const { senderId,receiverId, cursor } = conversation;
  const limit = 8;
  const messegeHistory = await prisma.privateMessege.findMany({
    where: {
      OR:[
        {

          senderId: senderId,
          receiverId:receiverId
        },
        {
          senderId: receiverId,
          receiverId:senderId
        }
      ],
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
  messegeHistory.reverse()
  
  return { messegeHistory, nextCursor };
}
