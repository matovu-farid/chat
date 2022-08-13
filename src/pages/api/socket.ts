import { Server } from "socket.io";
import { getRooms, saveMessege } from "../../prisma_fuctions/room";
import { Prisma, prisma } from "../../server/db/client";
import Room from "../../Interfaces/Room";
import { z } from "zod";
import Messege from "../../Interfaces/Messege";


export default function SocketHandler(_: any, res: any) {
  if (res.socket.server.io) {
    console.log("socket is running");
    res.end();
    return;
  }
  const io = new Server(res.socket.server);
  io.on("connect", (_) => {});
  io.on("connect", (socket) => {
    socket.emit(
      "serverMessege",
      `Welcome ${socket.id}, you are now connected to the Server`
    );
    socket.on("joinRooms", (fetchedRooms) => {
      try {
        const rooms: Room[] = fetchedRooms;
        rooms.forEach((room) => {
          socket.join(room.name);

          socket.emit("serverMessege", "rooms connected");
        });
        console.log(socket.rooms);
      } catch (e) {
        console.log(e);
        socket.emit("serverMessege", "rooms failed connection");
      }
    });
		socket.on("leaveRooom",(room)=>{
			socket.leave(room.name)

		})

    socket.on("sendMessege", (room, messege) => {
      console.log("room : ", room.name);
      console.log("messege : ", messege);

      saveMessege(messege).then((msg)=>{
        io.in(room.name).emit("messege", JSON.stringify(msg));

      });
    });
  });
  res.end("This is the sockets api");
}
