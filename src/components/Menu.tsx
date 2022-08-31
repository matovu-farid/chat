import Link from "next/link";
import React from "react";
import { slide as MenuComponent } from "react-burger-menu";
import useUser from "../hooks/useUser";
import useRooms from "../hooks/useRooms";

const Menu = () => {
  const { data: rooms } = useRooms();
  return (
    <MenuComponent>
      <li className="menu-item">
        <Link href="/user">
          <a className="w-full py-2">Profile Page</a>
        </Link>
      </li>
      {rooms ? (
        rooms.map((room) => (
          <li key={room.id} className="menu-item">
            <Link as={`/room/${room.id}`} href="/room/[roomId]">
              <a className="w-full py-2">{room.name}</a>
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
