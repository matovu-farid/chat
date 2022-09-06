import { Server } from "socket.io";
import SignalData from "../../Interfaces/SignalData";
import { saveMessege, savePrivateMessege } from "../../prisma_fuctions/messege";
import { joinRooms } from "../../utils/socket_functions";
import socket from "../../utils/socket_init";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SocketHandler(_: any, res: any) {
  if (res.socket.server.io) {
    console.log("socket is running");
    res.end("socket is running");
    return;
  }
  const io = new Server(res.socket.server);
  const idMap: Map<string, string> = new Map();
  res.socket.server.io = io;
  io.on("connection", (socket) => {
    socket.emit(
      "serverMessege",
      `Welcome ${socket.id}, you are now connected to the Server`
    );
    socket.on("clientInfo", (userId: string) => {
      idMap.set(userId, socket.id);
      console.log("ClientInfo");
      console.log(idMap);
    });
    socket.on("joinRooms", (userId) => {
      joinRooms(userId, socket);
    });
    socket.on("joinRoom", (roomPath) => {
      socket.join(roomPath);
    });

    socket.on("leaveRooom", (room) => {
      if (typeof room === "string") socket.leave(room);
      socket.leave(room.path);
    });

    socket.on("sendMessege", (room, message) => {
      io.in(room.path).emit("chat", JSON.stringify(message));
      delete message.sender;
      saveMessege(message);
    });
    socket.on("sendPrivateMessage", (message) => {
      const messageString = JSON.stringify(message);
      const receiverSocketId = idMap.get(message.receiverId);
      if (receiverSocketId)
        socket.to(receiverSocketId).emit("privateChat", messageString);
      socket.emit("privateChat", messageString);
      delete message.sender;
      savePrivateMessege(message);
    });
    socket.on("callUser", (data: SignalData) => {
      const called = idMap.get(data.to);
      const caller = idMap.get(data.from);
      console.log(data)
      if (caller && called) {
        io.to(called).emit("called", { signal: data.signal, from: caller,to:called });
        console.log(`${data.from} calling ${data.to}`);
      }
    });
    socket.on("callRejected", (callerId) => {
      socket.to(callerId).emit("callRejected");
    });
    socket.on("answerCall", (data) => {
      console.log(data);
      console.log(`${data.to}'s call is answered by ${data.from}`);
      io.to(data.to).emit("answered", data);
    });
  });

  res.end("This is the sockets api");
}

export const config = {
  api: {
    bodyParser: false,
  },
};