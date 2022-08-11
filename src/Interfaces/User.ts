import { z } from "zod";
export const ZUser = z.object({
  name: z.optional(z.string()),
  id: z.optional(z.string()),
  email: z.optional(z.string())
});
type User = z.infer<typeof ZUser>
export default User
