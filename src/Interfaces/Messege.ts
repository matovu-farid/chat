import { Message, User } from "@prisma/client";
import { z, ZodMap } from "zod";
import { ZUser } from "./User";

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
  text: z.string(),
});
export const ZConversation = z.object({
  senderId: z.string(),
  receiverId: z.string(),
});
export const ZPaginatedConversation = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  cursor: z.string(),
});

type Messege = z.infer<typeof ZMessege>;
export type MessegeWithUser = Message & {
  sender: User;
};
export type PrivateMessegeWithUser = Message & {
  sender: User;
};
export type PaginatedConversation = z.infer<typeof ZPaginatedConversation>;
export type Conversation = z.infer<typeof ZConversation>;
export type PrivateMessege = z.infer<typeof ZPrivateMessage>;

export default Messege;
