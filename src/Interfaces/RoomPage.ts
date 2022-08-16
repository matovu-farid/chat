import { z } from "zod";
export const ZRoompage = z.object({
  roomId: z.string(),
  cursor: z.optional(z.string()),
});
type Roompage = z.infer<typeof ZRoompage>
export default Roompage
