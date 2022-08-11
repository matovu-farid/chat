// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { roomRouter } from "./room";
import { protectedExampleRouter } from "./protected-example-router";
import { messageRouter } from "./messege";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("room.", roomRouter)
  .merge("message.", messageRouter)
  .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
