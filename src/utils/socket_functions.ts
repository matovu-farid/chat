import { Socket } from "socket.io";
import { getRooms } from "../prisma_fuctions/room";
import {prisma} from "../server/db/client";

export const joinRooms = async(userId:string,socket:Socket)=>{
  const rooms = await getRooms(userId,prisma)

  rooms.forEach((room) => {
    socket.join(room.path);
  });
}
//TODO: To be deleted
const funcs = true;
export default funcs