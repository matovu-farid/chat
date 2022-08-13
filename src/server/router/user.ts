import { createRouter } from "./context";
import { z } from "zod";
import { deleteUser, searchUsers } from "../../prisma_fuctions/user";


export const userRouter = createRouter()
  .query("searchUser", {
    input: z.string(),
    async resolve({ input:term,ctx:{prisma} }) {
      return await searchUsers(term,prisma)
    },
  }).mutation('deleteUser',{
    input: z.string(),
    async resolve({ input:userId,ctx:{prisma} }) {
      return await deleteUser(userId,prisma)
    },
  })
