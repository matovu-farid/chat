import { createRouter } from "./context";
import { z } from "zod";
import { ZRoom } from "../../Interfaces/Room";
import { addToRoom, createroom, getRooms, getUsersInRoom } from "../../prisma_fuctions/room";
import { ZUserRoomSession } from "../../Interfaces/UserRoomSession";

export const roomRouter = createRouter()
  .mutation("createRoom", {
    input: ZRoom,
    output:z.string(),
    async resolve({ input:room,ctx:{prisma} }) {
      await createroom(room,prisma)
      return "success"
    },
  })
  .query("getRooms", {
    input: z.string(),
    async resolve({ input:userId,ctx:{prisma} }) {
      return await getRooms(userId,prisma);
    },
  })
  .query("getUsersInRoom", {
    input: z.string(),
    async resolve({ input:roomId,ctx:{prisma} }) {
      return await getUsersInRoom(roomId,prisma);
    },
  }) 
  .mutation("addToRoom", {
    input: ZUserRoomSession,
    output: z.string(),
    async resolve({ input:userRoomSession,ctx:{prisma} }) {
       await addToRoom(userRoomSession,prisma);
      return "success"
    },
  });
