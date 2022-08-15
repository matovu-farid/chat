import { z } from "zod";
export const ZRoompage = z.object({
  roomId: z.string(),
  page: z.number()
});
type Roompage = z.infer<typeof ZRoompage>
export default Roompage
