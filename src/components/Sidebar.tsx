import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import useRooms from "../hooks/useRooms";
import useSidebar from "../hooks/useSidebar";
import Modal from "./Modal";

const Sidebar = () => {
  const { data: rooms } = useRooms();
  const { isOpen, closeSidebar } = useSidebar();
  const { status } = useSession();

  return isOpen ? (
    <Modal className="z-100">
      <div className="  text-white pointer-events-none flex  fixed  top-0 left-0 right-0 h-screen">
        <div>
          <div className="h-[90px]"></div>

          <div
            className={
              "z-20 h-full w-64 relative right-64 translate-x-64 pointer-events-auto   "
            }
          >
            <ul className="flex flex-col z-10 bg-gray-900 h-full text-white px-3 py-10 ">
              <li className="py-2">
                <Link href="/">
                  <a className="w-full">Home</a>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/user">
                  <a className="w-full">Profile Page</a>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/room/new">
                  <a className="w-full">Create Room</a>
                </Link>
              </li>
              {rooms ? (
                rooms.map((room) => (
                  <li key={room.id} className="py-2">
                    <Link as={`/room/${room.id}`} href="/room/[roomId]">
                      <a className="w-full py-2">{room.name}</a>
                    </Link>
                  </li>
                ))
              ) : (
                <p> Please join some rooms or create a room</p>
              )}
              <li className="h-full flex items-end text-start pb-20">
                {status === "authenticated" ? (
                  <button onClick={() => signOut()} className="w-full">
                    signout
                  </button>
                ) : (
                  <button onClick={() => signIn()} className="w-full">
                    SignIn
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div
          className=" bg-gray-900 opacity-50 pointer-events-auto top-0 w-full h-full"
          onClick={() => closeSidebar()}
        ></div>
      </div>
    </Modal>
  ) : null;
};

export default Sidebar;
