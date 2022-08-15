import User from "../Interfaces/User";
import { Prisma, prisma } from "../server/db/client";

export async function searchUsers(term: string, prisma: Prisma){
  // const users =await prisma.$queryRaw`SELECT * FROM User WHERE SIMILARITY(name, '${term}') > 0.1;`
 if(term==='') return []
  const users = await prisma.user.findMany({
    where: {
        name: {
          contains: term
        },
      
      
      
    }
  })
   console.log(users)
  return users as User[]
}
export function deleteUser(userId: string, prisma: Prisma) {
  return prisma.user.delete({
    where:{
      id: userId
    }
  })
}
