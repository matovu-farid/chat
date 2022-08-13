import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { slide as MenuComponent } from "react-burger-menu";
import { trpc } from "../utils/trpc";
import useSocket from "../hooks/useSocket";
import useUser from "../hooks/useUser";


const Menu = () => {
  const user = useUser();

  return <>{user ? <MenuInternal userId={user.id}></MenuInternal> : null}</>;
};
interface Props {
  userId: string;
}
const MenuInternal = ({ userId }: Props) => {
  const { data: rooms, isFetched} = trpc.useQuery(["room.getRooms", userId]);
  const socket = useSocket()
 
  
    const connectToRooms=async ()=>{
     
      socket.emit("joinRooms",rooms)
    }
   
    useEffect(()=>{
      if(isFetched){
        console.log(rooms)
        connectToRooms()
      }
    },[isFetched])
  
  
  return (
    <MenuComponent>
      {rooms ? (
        rooms.map((room) => (
          <li key={room.id} className="menu-item">
            <Link href={`/room/${room.id}`}>
              <a className="w-full py-2" >{room.name}</a>
            </Link>
          </li>
        ))
      ) : (
        <p> Please join some rooms or create a room</p>
      )}
    </MenuComponent>
  );
};

export default Menu;
