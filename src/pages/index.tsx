import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import Link from "next/link";
import useUser from "../hooks/useUser";

const Home: NextPage = () => {
  const user = useUser();
  const { status } = useSession();

  return (
    <div className="grid place-items-center  h-[60vh]">
      <main className="grid justify-center max-w-[60em] text-center gap-2 ">
        <h1 className="text-6xl p-3">Welcome to Mafa </h1>
        <h2 className="text-xl p-2">
          We are here to help you connect, communicate, and express your ideas
          so you can get more done together. We offer organized spaces for
          everyone and everything you need for work.
        </h2>
        {status == "authenticated" ? (
          <div className="grid gap-4 justify-center">
            <div>
              <p>
                {" "}
                You are signed in as {user.name} with {user.email} email 👍
              </p>
              <p>We are happy to have you ❤️ </p>
            </div>
            <div className="text-start ">
              <h3 className="font-bold p-1">Capabilities</h3>
              <ol className=" list-decimal">
                <li>
                  You can now search and call any user by clicking on the{"  "}
                  <BsFillTelephonePlusFill className="inline text-green-500 " />
                </li>
                <li>You can create rooms</li>
                <li>You can chat with any user you have searched for</li>
                <li>You can</li>
              </ol>
              <span>Try the </span>{" "}
              <span>
                <GiHamburgerMenu className="inline" />
              </span>{" "}
              <span>in the top right corner</span>
            </div>
          </div>
        ) : (
          <p className="text-lg">
            <span>You can </span>
            <span>
              <button
                className="bg-transparent text-blue-500"
                onClick={() => {
                  signIn();
                }}
              >
                sign in
              </button>
            </span>
            <span> here 😉 to get all access all the cool features</span>
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;
