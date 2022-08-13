import { createRouter } from "./context";
import { z } from "zod";
import { searchUsers } from "../../prisma_fuctions/user";


export const userRouter = createRouter()
  .query("searchUser", {
    input: z.string(),
    async resolve({ input:term,ctx:{prisma} }) {
      return await searchUsers(term,prisma)
    },
  })
