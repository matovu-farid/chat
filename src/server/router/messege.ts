import { createRouter } from "./context";
import { z } from "zod";
import { ZMessege, ZPrivateMessage } from "../../Interfaces/Messege";
import { createMessege, createPrivateMessege, deleteMessege, deletePrivateMessege, getMesseges, getPaginatedMesseges } from "../../prisma_fuctions/messege";
import { ZRoompage } from "../../Interfaces/RoomPage";

export const messageRouter = createRouter()
  .query("createMessege", {
    input: ZMessege,
    async resolve({ input:messege,ctx:{prisma} }) {
      return await createMessege(messege,prisma)
    },
  })
  .query("getMesseges", {
    input: z.string(),
    async resolve({ input:roomId,ctx:{prisma} }) {
      return await getMesseges(roomId,prisma);
    },
  })
  .query("getPaginatedMesseges", {
    input: ZRoompage,
    async resolve({ input:{roomId,cursor},ctx:{prisma} }) {
      return await getPaginatedMesseges({roomId,cursor},prisma);
    },
  })
  .query("deleteMessege", {
    input: z.string(),
    async resolve({ input:messegeId,ctx:{prisma} }) {
      return await deleteMessege(messegeId,prisma);
    },
  })
  .query("createPrivateMessege",{
    input: ZPrivateMessage,
    async resolve({ input:message,ctx:{prisma} }){
      return createPrivateMessege(message,prisma)
    }
  })
  .query("deletePrivateMessege", {
    input: z.string(),
    async resolve({ input:messegeId,ctx:{prisma} }) {
      return await deletePrivateMessege(messegeId,prisma);
    },
  })
  ;
