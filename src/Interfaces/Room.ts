import {z} from "zod";

export const ZRoom = z.object({
  id: z.optional(z.string()),
  name: z.string(),
  path: z.string(),
  image: z.optional(z.string())
})

type Room = z.infer<typeof ZRoom>;
export default Room;