import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import User from "../Interfaces/User";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import UserTile from "./UserTile";

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
    <div className=" flex gap-2 ">
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
              {users?.map((searchedUser) => (
                <UserTile
                  key={searchedUser.id}
                  handleUserClicked={handleUserClicked}
                  searchedUser={searchedUser}
                ></UserTile>
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
