import { Room } from "@prisma/client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { trpc } from "../utils/trpc";

const dummyRooms: Room[] = [];
export const roomsCtx = createContext(dummyRooms);

const RoomsProvider = ({children}: PropsWithChildren) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { id: userId } = useUser();
  const { data: fetchedRooms,isFetched } = trpc.useQuery(["room.getRooms", userId]);
  useEffect(()=>{
    if(isFetched && fetchedRooms){
      setRooms(fetchedRooms)
    }
  },[isFetched])

  return <roomsCtx.Provider value={rooms}>{children}</roomsCtx.Provider>;
};

export default RoomsProvider;
