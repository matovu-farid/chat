import Room from "../Interfaces/Room";
import RoomUpdater from "../Interfaces/Roomupdator";
import UserRoom from "../Interfaces/UserRoomSession";
import { Prisma, prisma } from "../server/db/client";
export async function createroom(room: Room, prisma: Prisma) {
  const createdRoom = prisma.room.create({
    data: {
      name: room.name,
      path: room.path,
      image: room.image,
      userId: room.userId,
      members: {
        connect: {
          id: room.userId,
        },
      },
      admins: {
        connect: {
          id: room.userId,
        },
      },
    },
  });

  return await createdRoom;
}
export async function isAdmin(userRoom: UserRoom, prisma: Prisma) {
  const room = prisma.room.findFirst({
    where: {
      AND: [
        {
          id: userRoom.roomId,
          admins: { some: { id: userRoom.userId } },
        },
      ],
    },
  });
  return room !== null;
}
export async function updateRoom(roomUpdater: RoomUpdater, prisma: Prisma) {
  const isadmin = await isAdmin(
    {
      roomId: roomUpdater.roomId,
      userId: roomUpdater.adminId,
    },
    prisma
  );
  if (!isadmin) throw "You must me an admin to update a room";
  const createdRoom = prisma.room.update({
    where: {
      id: roomUpdater.roomId,
    },
    data: roomUpdater.data,
  });

  return await createdRoom;
}

export async function getRooms(userId: string, prisma: Prisma) {
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
export async function getRoom(roomId: string, prisma: Prisma) {
  return prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
}
export async function getUsersInRoom(roomId: string, prisma: Prisma) {
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
export async function addToRoom(userRoomSession: UserRoom, prisma: Prisma) {
  console.log(userRoomSession)
   await prisma.room.update({
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

export function countRoomMembers(roomId: string, prisma: Prisma) {
  return prisma.user.count({
    where: {
      rooms: {
        some: {
          id: roomId,
        },
      },
    },
  });
}

export function getRoomMembers(roomId: string, prisma: Prisma) {
  return prisma.user.findMany({
    where: {
      rooms: {
        some: {
          id: roomId,
        },
      },
    },
  });
}

export function countRoomAdmins(roomId: string, prisma: Prisma) {
  return prisma.user.count({
    where: {
      ownedRooms: {
        some: {
          id: roomId,
        },
      },
    },
  });
}
function disconnectUserFromRoom(isadmin: boolean, userRoomSession: UserRoom) {
  prisma.room.update({
    where: {
      id: userRoomSession.roomId,
    },
    data: {
      members: {
        disconnect: {
          id: userRoomSession.userId,
        },
      },
    },
  });
  if (isadmin) {
    prisma.room.update({
      where: {
        id: userRoomSession.roomId,
      },
      data: {
        admins: {
          disconnect: {
            id: userRoomSession.userId,
          },
        },
      },
    });
  }
}

export async function leaveRoom(userRoomSession: UserRoom, prisma: Prisma) {
  const hasOtherMembers =
    (await countRoomMembers(userRoomSession.roomId, prisma)) > 1;
  const isadmin = await isAdmin(userRoomSession, prisma);
  const hasOtherOtherAdmins =
    (await countRoomMembers(userRoomSession.roomId, prisma)) > 1;
  const hasOtherMembersAndNotAdmin = hasOtherMembers && !isadmin;
  const adminButHasOthers = hasOtherMembers && isadmin && hasOtherOtherAdmins;
  if (hasOtherMembersAndNotAdmin || adminButHasOthers) {
    disconnectUserFromRoom(isadmin, userRoomSession);
  } else return await deleteRoom(userRoomSession,prisma);
}
export async function deleteRoom(userRoomSession: UserRoom, prisma: Prisma) {
  const isadmin = await isAdmin(userRoomSession, prisma);
  if (isadmin) {
    prisma.room.delete({
      where: {
        id: userRoomSession.roomId,
      },
    });
  }
}

