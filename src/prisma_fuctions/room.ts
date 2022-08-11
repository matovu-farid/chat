import Room from "../Interfaces/Room";
import UserRoom from "../Interfaces/UserRoomSession";
import { Prisma, prisma } from "../server/db/client";
export async function createroom(room: Room,prisma:Prisma ) {
	const createdRoom = prisma.room.create({
		data: {
			name: room.name,
			path: room.path,
			image: room.image,
			members: {
				connect: {
					id: room.creator
				}
			}
		},
	});

	return await createdRoom;
}
export async function getRooms(userId: string,prisma:Prisma ) {
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
export async function getUsersInRoom(roomId: string,prisma:Prisma ) {
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
export async function addToRoom(userRoomSession: UserRoom, prisma:Prisma ) {
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
