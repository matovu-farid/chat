import type { NextPage } from "next";
import { signOut } from "next-auth/react";

import Link from "next/link";
import useUser from "../hooks/useUser";


const Home: NextPage = () => {
 
  const buttonClasses = "bg-blue-500 text-white py-2 px-4 rounded-md";
 
  
  const handleSignout = () => {
    signOut();
  };
  
  const user = useUser()
  

  return (
    <>
      { (
        <>
          <p>
            You are signed in as {user.name} with {user.email}
          </p>
          <div className="flex gap-2">
            <Link href={"/room/new"} >
              <a className="bg-blue-500 py-2 px-3 rounded-md no-underline text-white">Create a Room</a>
            </Link>
               <Link href={"/room"} >
              <a className="bg-blue-500 py-2 px-3 rounded-md no-underline text-white">Rooms</a>
            </Link>
            
            <button onClick={handleSignout} className={buttonClasses}>
              signout
            </button>
          </div>
        </>
      ) }
    </>
  );
};

export default Home;
