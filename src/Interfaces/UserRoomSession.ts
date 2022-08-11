import { z } from "zod";
export const ZUserRoomSession = z.object({
  userId: z.string(),
  roomId: z.string()
});
type UserRoom = z.infer<typeof ZUserRoomSession>
export default UserRoom
