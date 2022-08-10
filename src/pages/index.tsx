import { Session } from "inspector";
import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};
interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const { data } = useSession();
  const user = useMemo(()=>{
    return data?.user
  },[data])
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
      {signedInUser ? (
        <>
          <p>
            You are signed in as {signedInUser.name} with {signedInUser.email}
          </p>
          <button onClick={handleSignout} className={buttonClasses}>signout</button>
        </>
      ) : (
        <button className={buttonClasses} onClick={handleSignin}>
          SignIn
        </button>
      )}
    </>
  );
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};

export default Home;
