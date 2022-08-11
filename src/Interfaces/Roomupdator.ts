import {z} from "zod";

export const ZRoomUpdater = z.object({
  roomId: z.string(),
  adminId: z.string(),
  data: z.object({

    name: z.optional(z.string().min(3)),
    path: z.optional(z.string().min(4).regex(/^\//i)),
    image: z.optional(z.string())
  })
})

type RoomUpdater = z.infer<typeof ZRoomUpdater>;
export default RoomUpdater;