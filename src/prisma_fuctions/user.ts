import User, { UserUpdater } from "../Interfaces/User";
import { Prisma } from "../server/db/client";

export async function searchUsers(term: string, prisma: Prisma) {
  if (term === "") return [];
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: term,
      },
    },
  });
  return users as User[];
}
export function deleteUser(userId: string, prisma: Prisma) {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
export function getUser(userId: string, prisma: Prisma) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
export function saveUser(user: UserUpdater, prisma: Prisma) {

  return prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
    },
  });
}
