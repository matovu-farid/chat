import { Server } from "socket.io";
import { saveMessege } from "../../prisma_fuctions/room";
import { prisma } from "../../server/db/client";
import { instrument } from "@socket.io/admin-ui";
import { PrivateMessege } from "../../Interfaces/Messege";

export default function SocketHandler(_: any, res: any) {
  if (res.socket.server.io) {
    console.log("socket is running");
    res.end("socket is running")
    return;
  }
  const io = new Server(res.socket.server);
  
  res.socket.server.io = io;
  instrument(io, {
    auth: false,
    mode: "development",
  });
  io.on("connection", (socket) => {
    
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

        });
    });
    socket.on("joinRoom",(roomPath)=>{
      socket.join(roomPath)
    })


    socket.on("leaveRooom", (room) => {
      if(typeof room === 'string')
      socket.leave(room)
      socket.leave(room.path);
    });

    socket.on("sendMessege", (room, message) => {
      
      io.in(room.path).emit("chat", JSON.stringify(message));
      delete message.sender

      saveMessege(message);
    });
    socket.on("sendPrivateMessage",(message:PrivateMessege)=>{
      const messageString = JSON.stringify(message)
      io.in(message.receiverId).emit('privateMessage',messageString)
      socket.emit('privateChat',messageString)
    })
  });

  res.end("This is the sockets api");

}

export const config = {
  api: {
      bodyParser: false
  }
}
