import { Server } from "socket.io";
import { saveMessege } from "../../prisma_fuctions/room";
// import { saveMessege } from "../../prisma_fuctions/room";
import { prisma } from "../../server/db/client";

export default function SocketHandler(_: any, res: any) {
  if (res.socket.server.io) {
    console.log("socket is running");
    res.end("socket is running")
    return;
  }
  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  io.on("connection", (socket) => {
    // console.log('-----------------------------------')
    // console.log(io.sockets.adapter.rooms)
    // console.log('-------------------------------------')
    
   
    // console.log("-----------------------------------");
    // console.log(io.sockets.adapter.rooms.get('/games'))
    // console.log("-----------------------------------");
    
    socket.emit(
      "serverMessege",
      `Welcome ${socket.id}, you are now connected to the Server`
    );
    socket.on("joinRooms", (userId) => {
      prisma.room
        .findMany({
          where: {
            members: {
              some: {
                id: userId,
              },
            },
          },
        })
        .then((rooms) => {
          rooms.forEach((room) => {
            socket.join(room.path);
            
          });
          // console.log("-----------------------------------");
          // console.log(socket.rooms)
          // console.log("-----------------------------------");

        });
    });

    socket.on("leaveRooom", (room) => {
      socket.leave(room.path);
    });

    socket.on("sendMessege", (room, messege) => {
      console.log('room',room)
      console.log('message',messege)
      
      io.in(room.path).emit("chat", JSON.stringify(messege));
      delete messege.sender

      saveMessege(messege);
    });
  });
  res.end("This is the sockets api");

}

export const config = {
  api: {
      bodyParser: false
  }
}
