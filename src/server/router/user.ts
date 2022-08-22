import { createRouter } from "./context";
import { z } from "zod";
import {
  deleteUser,
  searchUsers,
  getUser,
  saveUser,
} from "../../prisma_fuctions/user";
import { ZUser, ZUserUpdater } from "../../Interfaces/User";
import { UserCtx } from "../../contexts/user";
import { createProtectedRouter } from "./protected-router";

export const userRouter = createProtectedRouter()
  .query("getUser", {
    input: z.string(),
    async resolve({ input: userId, ctx: { prisma } }) {
      return await getUser(userId, prisma);
    },
  })
  .query("searchUser", {
    input: z.string(),
    async resolve({ input: term, ctx: { prisma,session:{user:{id:userId}} } }) {
      return await searchUsers(term,userId, prisma);
    },
  })
  .mutation("deleteUser", {
    input: z.string(),
    async resolve({ input: userId, ctx: { prisma } }) {
      return await deleteUser(userId, prisma);
    },
  })
  .mutation("saveUser", {
    input: ZUserUpdater,
    async resolve({ ctx: { prisma,session:{user} }}) {
      return await saveUser(user, prisma);
    },
  })
