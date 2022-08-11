import { createRouter } from "./context";
import { z } from "zod";
import { ZRoom } from "../../Interfaces/Room";
import { addToRoom, createroom, getRooms, getUsersInRoom } from "../../prisma_fuctions/room";
import { ZUserRoomSession } from "../../Interfaces/UserRoomSession";

export const roomRouter = createRouter()
  .query("createRoom", {
    input: ZRoom,
    async resolve({ input:room,ctx:{prisma} }) {
      return await createroom(room,prisma)
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
  .query("addToRoom", {
    input: ZUserRoomSession,
    async resolve({ input:userRoomSession,ctx:{prisma} }) {
      return await addToRoom(userRoomSession,prisma);
    },
  });
