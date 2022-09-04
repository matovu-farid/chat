import { ImageUpdater } from "../Interfaces/Image";
import User, { UserUpdater } from "../Interfaces/User";
import { Prisma } from "../server/db/client";

export async function searchUsers(term: string,userId:string, prisma: Prisma) {
  if (term === "") return [];
  const users = await prisma.user.findMany({
  
    where: {
      
      name: {
         contains: term,
         mode: 'insensitive'
        
      },
      NOT: {
        id: userId
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
  return prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: user.name,
      email: user.email,
    },
  });
}
export function saveImage({image, userId}:ImageUpdater, prisma: Prisma) {
  console.log('image',image,'userId',userId)
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: image,
    },
  });
}
export function getImage(userId:string, prisma: Prisma) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      image:true
    }
   
  });
}
