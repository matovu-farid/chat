import { Message, User } from "@prisma/client";
import {z, ZodMap} from "zod";

export const ZMessege = z.object({
  id: z.optional(z.string()),
 text: z.string(),
 roomId: z.string(),
 senderId: z.string(),
})



type Messege = z.infer<typeof ZMessege>;
export type MessegeWithUser = Message & {
  sender: User
}
export default Messege;