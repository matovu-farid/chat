import Room from "../../Interfaces/Room";
import { prisma } from "./client";
export async function createroom(room: Room) {
	const createdRoom = prisma.room.create({
		data: {
			name: room.name,
			path: room.path,
			image: room.image,
			serverId: room.serverId,
		},
	});

	return await createdRoom;
}
export async function getRooms(userId: string) {
	return prisma.room.findMany({
		where: {
			members: {
				some: {
					id: userId,
				},
			},
		},
	});
}
export async function getUsersInRoom(roomId: string) {
	const users = prisma.user.findMany({
		where: {
			rooms: {
				some: {
					id: roomId,
				},
			},
		},
	});
	return users;
}
export async function addToRoom(userRoomSession: {
	userId: string;
	roomId: string;
}) {
	prisma.room.update({
		where: {
			id: userRoomSession.roomId,
		},
		data: {
			members: {
				connect: {
					id: userRoomSession.userId,
				},
			},
		},
	});
}
