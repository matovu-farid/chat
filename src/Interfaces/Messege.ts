import {z} from "zod";

export const ZMessege = z.object({
  id: z.optional(z.string()),
 text: z.string(),
 roomId: z.string(),
 senderId: z.string()
})

type Messege = z.infer<typeof ZMessege>;
export default Messege;