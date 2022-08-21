import { Message, User } from "@prisma/client";
import { z, ZodMap } from "zod";

export const ZMessege = z.object({
  id: z.optional(z.string()),
  text: z.string(),
  roomId: z.string(),
  senderId: z.string(),
});

export const ZPrivateMessage = z.object({
  id: z.optional(z.string()),
  senderId: z.string(),
  receiverId: z.string(),
  text: z.string()
});

type Messege = z.infer<typeof ZMessege>;
export type MessegeWithUser = Message & {
  sender: User;
};
export type PrivateMessege = z.infer<typeof ZPrivateMessage>
export default Messege;
