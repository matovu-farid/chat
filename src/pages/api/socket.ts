import { Server } from "socket.io";
import { getRooms } from "../../prisma_fuctions/room";
import {Prisma, prisma} from "../../server/db/client"
import Room from "../../Interfaces/Room";
import {z} from "zod";
import Messege from "../../Interfaces/Messege";


async function saveMessege(messege: Messege){
	prisma.message.create({
		data: messege
	})
}
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
			"serverMessege",
			`Welcome ${socket.id}, you are now connected to the Server`
		);
		socket.on("joinRooms",(fetchedRooms)=>{
			const rooms:Room[] = fetchedRooms
			rooms.forEach(room=>{
				socket.join(room.path)
			})
			socket.emit("serverMessege",socket.rooms)
		})

		
		socket.on("sendMessege", (roomPath,messege)=>{
			io.of(roomPath).emit("messege",messege)
			console.log(messege,roomPath)
			return saveMessege(messege)
		})
	});
	res.end("This is the sockets api");
}
