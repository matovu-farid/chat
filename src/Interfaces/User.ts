import { nullable, z } from "zod";
export const ZUser = z.object({
  name: z.optional(z.string()).nullable(),
  id: z.string(),
  email: z.optional(z.string()).nullable(),
  image: z.optional(z.string()).nullable()
});
type User = z.infer<typeof ZUser>
export default User
