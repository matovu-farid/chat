import {z} from "zod";

export const ZRoom = z.object({
  id: z.optional(z.string()),
  creator: z.string(),
  name: z.string().min(3),
  path: z.string().min(4).regex(/^\//i),
  image: z.optional(z.string())
})

type Room = z.infer<typeof ZRoom>;
export default Room;