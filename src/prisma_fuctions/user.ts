import User from "../Interfaces/User";
import { Prisma, prisma } from "../server/db/client";

export async function searchUsers(term: string, prisma: Prisma) {
  const users = await prisma.user.findMany({
    where: {
      name: {
        search: term
      }
    }
  })
  console.log(users)
  return users
}
export function deleteUser(userId: string, prisma: Prisma) {
  return prisma.user.delete({
    where:{
      id: userId
    }
  })
}
