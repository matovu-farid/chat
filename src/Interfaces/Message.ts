import {z} from "zod";

export const ZMessage = z.object({
  id: z.optional(z.string()),
 text: z.string(),
 roomId: z.string(),
 senderId: z.string()
})

type Message = z.infer<typeof ZMessage>;
export default Message;