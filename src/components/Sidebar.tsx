import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import useRooms from "../hooks/useRooms";
import useSidebar from "../hooks/useSidebar";
import Modal from "./Modal";
import TileCategory from "./TileCategory";

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
              "z-20 h-full w-64 relative animate-[sidebarOpen_0.5s_ease-in-out] pointer-events-auto   "
            }
          >
            <ul className="flex flex-col z-10 bg-gray-900 h-full text-white py-10 ">
              <li className=" flex w-full  cursor-pointer">
                <Link className="w-full" href="/">
                  <a className="w-full  p-2 hover:bg-white rounded-[20px]  hover:text-gray-900 text-white">Home</a>
                </Link>
              </li>
              <li className="flex w-full  cursor-pointer ">
                <Link className="w-full" href="/user">
                  <a className="w-full  p-2 hover:bg-white rounded-[20px]  hover:text-gray-900 text-white">Profile Page</a>
                </Link>
              </li>
              <li className="flex w-full  cursor-pointer">
                <Link className="w-full" href="/room/new">
                  <a className="w-full  p-2 hover:bg-white rounded-[20px]  hover:text-gray-900 text-white">Create Room</a>
                </Link>
              </li>
              <li className="flex w-full  cursor-pointer">
                <Link className="w-full" href="/chat/video">
                  <a className="w-full  p-2 hover:bg-white rounded-[20px]  hover:text-gray-900 text-white">Video</a>
                </Link>
              </li>
              {rooms ? (
                <TileCategory name="Rooms" type="room" subcategories={rooms} />
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
          className="
            cursor-pointer pointer-events-auto top-0 w-full h-full 
           "
          onClick={() => closeSidebar()}
        ></div>
      </div>
    </Modal>
  ) : null;
};

export default Sidebar;
