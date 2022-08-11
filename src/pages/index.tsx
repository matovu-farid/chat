import { Session } from "inspector";
import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "../utils/trpc";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
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
          <button onClick={handleSignout} className={buttonClasses}>
            signout
          </button>
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
