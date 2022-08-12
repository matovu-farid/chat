import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { slide as MenuComponent } from "react-burger-menu";
import { useQuery } from "react-query";
import { trpc } from "../utils/trpc";

const Menu = () => {
  const session = useSession();
  const user = session.data?.user;

  return <>{user ? <MenuInternal userId={user.id}></MenuInternal> : null}</>;
};
interface Props {
  userId: string;
}
const MenuInternal = ({ userId }: Props) => {
  const { data: rooms } = trpc.useQuery(["room.getRooms", userId]);
  console.log(rooms)
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
