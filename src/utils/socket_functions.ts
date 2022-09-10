import { Socket } from "socket.io";
import { getRooms } from "../prisma_fuctions/room";
import { updateOnlineUser } from "../prisma_fuctions/user";
import { prisma } from "../server/db/client";

export const joinRooms = async (userId: string, socket: Socket) => {
  const rooms = await getRooms(userId, prisma);

  rooms.forEach((room) => {
    socket.join(room.path);
  });
};
export const updateOnline = async (userId: string, online: boolean) => {
  return await updateOnlineUser(userId, online, prisma);
};
