import User from "../Interfaces/User";
import { Prisma, prisma } from "../server/db/client";

export function searchUsers(term: string, prisma: Prisma) {
  return prisma.user.findMany({
    where: {
      name: {
        search: term
      }
    }
  })
}
export function deleteUser(userId: string, prisma: Prisma) {
  return prisma.user.delete({
    where:{
      id: userId
    }
  })
}
