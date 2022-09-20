import { Server } from "socket.io";
import SignalData, { CallInfo } from "../../Interfaces/SignalData";
import { saveMessege, savePrivateMessege } from "../../prisma_fuctions/messege";
import {
  createSocketData,
  joinRooms,
  updateOnline,
} from "../../utils/socket_functions";
import {
  SocketEvent,
  MessageEvent,
  RoomEvent,
  CallEvent,
} from "../../utils/events";

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
    socket.on(SocketEvent.iam_online, (userId: string) => {
      updateOnline(userId, true);

      setTimeout(() => {
        updateOnline(userId, false);
        socket.emit(SocketEvent.are_you_online);
      }, 180000);
    });

    socket.on(SocketEvent.clientInfo, (userId: string) => {
      userIdToSocketId.set(userId, socket.id);
    });
    socket.on(SocketEvent.ringing, (data: CallInfo) => {
      const { callerId } = data;
      socket.to(callerId).emit(SocketEvent.ringing);
    });
    socket.on(RoomEvent.joinRooms, (userId) => {
      joinRooms(userId, socket);
    });
    socket.on(RoomEvent.joinRoom, (roomPath) => {
      socket.join(roomPath);
    });

    socket.on(RoomEvent.leaveRoom, (room) => {
      if (typeof room === "string") socket.leave(room);
      socket.leave(room.path);
    });
    socket.on(CallEvent.startRoomCall, (room: string, newMember: string) => {
      io.to(room).emit(CallEvent.sendOffer, newMember);
    });

    socket.on(MessageEvent.sendMessege, (room, message) => {
      io.in(room.path).emit(MessageEvent.chat, JSON.stringify(message));
      delete message.sender;
      saveMessege(message);
    });
    socket.on(MessageEvent.sendPrivateMessage, (message) => {
      const messageString = JSON.stringify(message);
      const receiverSocketId = userIdToSocketId.get(message.receiverId);
      if (receiverSocketId)
        socket
          .to(receiverSocketId)
          .emit(MessageEvent.privateChat, messageString);
      socket.emit(MessageEvent.privateChat, messageString);
      delete message.sender;
      savePrivateMessege(message);
    });
    socket.on(CallEvent.callUser, (data: SignalData) => {
      const socketData = createSocketData(data, userIdToSocketId);
      const { to, from } = socketData;

      if (to && from) io.to(to).emit(CallEvent.called, socketData);
    });
    socket.on(CallEvent.callRejected, (callerId) => {
      socket.to(callerId).emit(CallEvent.callRejected);
    });
    socket.on(CallEvent.answerCall, (data) => {
      console.log(`${data.to}'s call is answered by ${data.from}`);
      io.to(data.to).emit(CallEvent.answered, data);
    });
  });

  res.end("This is the sockets api");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
