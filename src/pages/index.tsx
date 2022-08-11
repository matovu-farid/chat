import { Session } from "inspector";
import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
const Home: NextPage = () => {
  const { data, status } = useSession();
  const user = useMemo(() => {
    return data?.user;
  }, [data]);
  const [signedInUser, setSignedInUser] = useState<User | null>(null);
  const buttonClasses = "bg-blue-500 text-white py-2 px-4 rounded-md";
  useEffect(() => {
    if (user) setSignedInUser(user);
  }, [user]);
  const handleSignin = () => {
    signIn();
  };
  const handleSignout = () => {
    signOut();
  };

  return (
    <>
      {status === "authenticated" ? (
        <>
          <p>
            You are signed in as {signedInUser?.name} with {signedInUser?.email}
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
      ) : (
        <button className={buttonClasses} onClick={handleSignin}>
          SignIn
        </button>
      )}
    </>
  );
};

export default Home;
