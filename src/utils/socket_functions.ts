import { Socket } from "socket.io";
import SignalData from "../Interfaces/SignalData";
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

export const createSocketData = (
  data: SignalData,
  userIdToSocketId: Map<string, string>
) => {
  const calledSocketId = userIdToSocketId.get(data.to);
  const callerSocketId = userIdToSocketId.get(data.from);
  return {
    ...data,
    from: callerSocketId,
    to: calledSocketId,
  };
};
