import { z } from "zod";
export const ZUser = z.object({
  name: z.optional(z.string()).nullable(),
  id: z.string(),
  email: z.optional(z.string()).nullable(),
  image: z.optional(z.string()).nullable(),
});
export const ZUserUpdater = z.object({
  name: z.optional(z.string()).nullable(),
  email: z.optional(z.string()).nullable(),
  image: z
    .optional(
      z.object({
        preview: z.string(),
        data: z.unknown(),
      })
    )
    .nullable(),
});
export type UserUpdater = z.infer<typeof ZUserUpdater>;
type User = z.infer<typeof ZUser>;
export default User;
