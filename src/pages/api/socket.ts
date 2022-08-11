import { Server } from "socket.io";
import { getRooms } from "../../prisma_fuctions/room";
import {prisma} from "../../server/db/client"
import {z} from "zod";


export default function SocketHandler(_: any, res: any) {
	if (res.socket.server.io) {
		console.log("socket is running");
		res.end();
		return;
	}
	const io = new Server(res.socket.server);
	io.on("connect",(_,)=>{})
	io.on("connect", (socket,) => {
		socket.emit(
			"welcome",
			`Welcome ${socket.id}, you are now connected to the Server`
		);
		
		socket.on("sendMessage", (_,room,message)=>{
			io.of(room).emit("messege",message)
		})
	});
	res.end("This is the sockets api");
}
