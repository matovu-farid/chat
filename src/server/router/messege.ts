import { createRouter } from "./context";
import { z } from "zod";
import {
  ZConversation,
  ZPaginatedConversation,
} from "../../Interfaces/Messege";
import {
  deleteMessege,
  deletePrivateMessege,
  getConversation,
  getMesseges,
  getPaginatedConversation,
  getPaginatedMesseges,
} from "../../prisma_fuctions/messege";
import { ZRoompage } from "../../Interfaces/RoomPage";

export const messageRouter = createRouter()

  .query("getMesseges", {
    input: z.string(),
    async resolve({ input: roomId, ctx: { prisma } }) {
      return await getMesseges(roomId, prisma);
    },
  })
  .query("getPaginatedMesseges", {
    input: ZRoompage,
    async resolve({ input: { roomId, cursor }, ctx: { prisma } }) {
      return await getPaginatedMesseges({ roomId, cursor }, prisma);
    },
  })
  .query("getPaginatedConversation", {
    input: ZPaginatedConversation,
    async resolve({ input: conversation, ctx: { prisma } }) {
      return await getPaginatedConversation(conversation, prisma);
    },
  })
  .query("deleteMessege", {
    input: z.string(),
    async resolve({ input: messegeId, ctx: { prisma } }) {
      return await deleteMessege(messegeId, prisma);
    },
  })
  .query("deletePrivateMessege", {
    input: z.string(),
    async resolve({ input: messegeId, ctx: { prisma } }) {
      return await deletePrivateMessege(messegeId, prisma);
    },
  })
  .query("getConversation", {
    input: ZConversation,
    async resolve({ input: conversation, ctx: { prisma } }) {
      return await getConversation(conversation, prisma);
    },
  });
