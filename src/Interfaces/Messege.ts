import {z} from "zod";
import { ZUser } from "./User";

export const ZMessege = z.object({
  id: z.optional(z.string()),
 text: z.string(),
 roomId: z.string(),
 senderId: z.string(),
})
export const ZMessegeWithUser=z.object({
  id: z.optional(z.string()),
  createdAt: z.string(),
  text: z.string(),
  sender: ZUser
})

type Messege = z.infer<typeof ZMessege>;
export type MessegeWithUser = z.infer<typeof ZMessegeWithUser>
export default Messege;