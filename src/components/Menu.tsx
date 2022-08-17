import Link from "next/link";
import React, { useEffect } from "react";
import { slide as MenuComponent } from "react-burger-menu";
import useSocket from "../hooks/useSocket";
import useUser from "../hooks/useUser";
import useRooms from "../hooks/useRooms";


const Menu = () => {
  const user = useUser();

  return <>{user ? <MenuInternal userId={user.id}></MenuInternal> : null}</>;
};
interface Props {
  userId: string;
}
const MenuInternal = ({ userId }: Props) => {
  const { data: rooms} = useRooms()
  const socket = useSocket()

   
    useEffect(()=>{
    
        socket.emit("joinRooms",userId)
      
    },[])
  
  
  return (
    <MenuComponent>
      {rooms ? (
        rooms.map((room) => (
          <li key={room.id} className="menu-item">
            <Link prefetch as={`/room/${room.id}`} href='/room/[roomId]'>
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
