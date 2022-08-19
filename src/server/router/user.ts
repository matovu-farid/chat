import { createRouter } from "./context";
import { z } from "zod";
import {
  deleteUser,
  searchUsers,
  getUser,
  saveUser,
} from "../../prisma_fuctions/user";
import { ZUser, ZUserUpdater } from "../../Interfaces/User";

export const userRouter = createRouter()
  .query("getUser", {
    input: z.string(),
    async resolve({ input: userId, ctx: { prisma } }) {
      return await getUser(userId, prisma);
    },
  })
  .query("searchUser", {
    input: z.string(),
    async resolve({ input: term, ctx: { prisma } }) {
      return await searchUsers(term, prisma);
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
    async resolve({ input: userId, ctx: { prisma } }) {
      return await saveUser(userId, prisma);
    },
  });
