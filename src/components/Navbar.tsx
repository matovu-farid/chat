import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";
import React from "react";
import Modal from "./Modal";
import Search from "./Search";

const Navbar = () => {
  const handleSignin = () => {
    signIn();
  };
  const handleSignout = () => {
    signOut();
  };

  const listClasses = "my-auto p-0 list-none";
  const buttonClasses =
    "my-auto bg-blue-600 text-white hover:bg-slate-600 transition-colors py-2 px-3 rounded-lg";
  const { status, data } = useSession();
  return (
    <div className="bg-gray-900 gap-2 text-white  h-24 w-full py-3 px-4 flex justify-end align-middle">
     <div className="self-center">
      <Modal>

      <Search></Search>
      </Modal>

     </div>
      <div className="flex gap-8 align-middle">
        <nav>
          <ul className="flex h-full gap-2 align-middle m-0 p-0 list-none">
            <li className={listClasses}>
              <Link href="/">
                <a className="h-full hover:text-pink-300">Home</a>
              </Link>
            </li>
            <li className={listClasses}>
              <Link href="/room">
                <a className="h-full hover:text-pink-300">Rooms</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex  ">
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
  );
};

export default Navbar;
