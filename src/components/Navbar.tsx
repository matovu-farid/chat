import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import useSidebar from "../hooks/useSidebar";
import useUser from "../hooks/useUser";

import Search from "./Search";
const Navbar = () => {
  const { openSidebar, isOpen, closeSidebar } = useSidebar();

  const handleSignin = () => {
    signIn();
  };
  const handleSignout = () => {
    signOut();
  };
  const handleMenuClicked = () => {
    isOpen ? closeSidebar() : openSidebar();
  };

  const listClasses = "my-auto p-0 list-none";
  const buttonClasses =
    "my-auto bg-blue-600 text-white hover:bg-slate-600 transition-colors py-2 px-3 rounded-lg";
  const { status } = useSession();
  return (
    <div
      className={
        "bg-gray-900 gap-2 text-white  h-24 w-full py-3 px-4 flex justify-between align-middle"
      }
    >
      {status === "authenticated" && (
        <button
          className="bg-transparent hover:text-green-500"
          onClick={() => handleMenuClicked()}
        >
          <GiHamburgerMenu className="text-[30px] cursor-pointer" />
        </button>
      )}
      {status === "authenticated" && (
        <div className="self-center">
          <Search></Search>
        </div>
      )}

      <div className="flex gap-8 align-middle">
        {status === "authenticated" && (
          <nav>
            <ul className="flex h-full gap-2 align-middle m-0 p-0 list-none">
              <li className={listClasses}>
                <Link href="/">
                  <a className="h-full hover:text-pink-300">Home</a>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <div>
          <div className="hidden md:flex h-full w-full flex-col justify-center">
            {status === "authenticated" ? (
              <button onClick={handleSignout} className={buttonClasses + " "}>
                signout
              </button>
            ) : (
              <button className={buttonClasses} onClick={handleSignin}>
                SignIn
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
