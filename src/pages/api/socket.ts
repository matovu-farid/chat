import { Server } from "socket.io";
import SignalData, { CallInfo } from "../../Interfaces/SignalData";
import { saveMessege, savePrivateMessege } from "../../prisma_fuctions/messege";
import { joinRooms, updateOnline } from "../../utils/socket_functions";
import socket from "../../utils/socket_init";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SocketHandler(_: any, res: any) {
  if (res.socket.server.io) {
    console.log("socket is running");
    res.end("socket is running");
    return;
  }
  const io = new Server(res.socket.server);
  const userIdToSocketId: Map<string, string> = new Map();

  res.socket.server.io = io;
  io.on("connection", (socket) => {
    socket.on("iam_online", (userId: string) => {
      updateOnline(userId, true);

      setTimeout(() => {
        updateOnline(userId, false);
        socket.emit("are_you_online");
      }, 180000);
    });

    socket.emit(
      "serverMessege",
      `Welcome ${socket.id}, you are now connected to the Server`
    );
    socket.on("clientInfo", (userId: string) => {
      userIdToSocketId.set(userId, socket.id);
      console.log("ClientInfo");
    });
    socket.on("ringing", (data: CallInfo) => {
      const { callerId } = data;
      socket.to(callerId).emit("ringing");
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
      const receiverSocketId = userIdToSocketId.get(message.receiverId);
      if (receiverSocketId)
        socket.to(receiverSocketId).emit("privateChat", messageString);
      socket.emit("privateChat", messageString);
      delete message.sender;
      savePrivateMessege(message);
    });
    socket.on("callUser", (data: SignalData) => {
      const calledSocketId = userIdToSocketId.get(data.to);
      const callerSocketId = userIdToSocketId.get(data.from);
      
      if (callerSocketId && calledSocketId) {
        io.to(calledSocketId).emit("called", {
          ...data,
          from: callerSocketId,
          to: calledSocketId,
          
        });
        console.log(`${data.from} calling ${data.to}`);
      }
    });
    socket.on("callRejected", (callerId) => {
      console.log('call rejected',callerId)
      socket.to(callerId).emit("callRejected");
    });
    socket.on("answerCall", (data) => {
      
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
