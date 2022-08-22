import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { AiFillPlusCircle } from "react-icons/ai";

import User from "../Interfaces/User";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";

const Search = () => {
  const [search, setSearch] = useState("");
  const { data: users } = trpc.useQuery(["user.searchUser", search]);
  const router = useRouter();

  const user = useUser();

  const handleUserClicked = (clickedUser: User) => {
    setSearch("");
    router.push(`/chat/${clickedUser.id}/${user.id}`);
  };

  return (
    <div className=" flex gap-2 fixed top-10 right-[250px]">
      <div>
        <input
          type="text"
          value={search}
          placeholder="search user..."
          onChange={(e) => setSearch(e.target.value)}
          className=" border-none p-2 text-gray-900 rounded-lg outline-none"
        />

        <div>
          {users && users.length > 0 && (
            <ul className="bg-white text-gray-900 flex flex-col rounded-lg p-2 shadow-md">
              {users?.map((user) => (
                <button
                  onClick={() => handleUserClicked(user)}
                  className="transition-colors my-0 px-2 rounded-lg cursor-pointer hover:bg-gray-900 hover:text-white active:text-white"
                  key={user.id}
                >
                  <div className="flex py-1 justify-start">
                    <div className="w-[90%]">{user.name}</div>
                    <div className="w-[10%] hover:bg-green-600 rounded-sm flex flex-col justify-center items-center">
                      <AiFillPlusCircle className=""></AiFillPlusCircle>
                    </div>
                  </div>
                </button>
              ))}
            </ul>
          )}

          {search && users && users.length === 0 && (
            <p className="bg-white text-gray-900 rounded-lg p-2">
              No users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
