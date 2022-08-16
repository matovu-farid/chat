import { Server } from "socket.io";
import { saveMessege } from "../../prisma_fuctions/room";
import {prisma} from '../../server/db/client'

export default function SocketHandler(_: any, res: any) {
  if (res.socket.server.io) {
    console.log("socket is running");
    res.end();
    return;
  }
  const io = new Server(res.socket.server);
  io.on("connect", (socket) => {
  
    console.log('-----------------------------------')
    console.log(io.sockets.adapter.rooms)
    console.log('-------------------------------------')
    socket.emit(
      "serverMessege",
      `Welcome ${socket.id}, you are now connected to the Server`
    );
    socket.on("joinRooms",(userId)=>{
      prisma.room.findMany({
        where: {
          members: {
            some: {
              id: userId
            }
          }
        }
      }).then(rooms=>{
        rooms.forEach((room) => {
          socket.join(room.name);

          socket.emit("serverMessege", "rooms connected");
        });
      })
    })


    socket.on("leaveRooom", (room) => {
      socket.leave(room.name);
    });

    socket.on("sendMessege", (room, messege) => {
      console.log("room : ", room.name);
      console.log("messege : ", messege);

      saveMessege(messege).then((msg) => {
        io.in(room.name).emit("messege", JSON.stringify(msg));
        io.in(room.name)
          .allSockets()
          .then((sockets) => {
            console.log(sockets);
          });
      });
    });
  });
  res.end("This is the sockets api");
}
