import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import Modal from "./Modal";

const Search = () => {
  const [search, setSearch] = useState("");
  const { data: users,isLoading } = trpc.useQuery(["user.searchUser", search]);
  const utils = trpc.useContext();

  return (
    <div className=" flex gap-2 fixed top-10 right-[250px]">
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" border-none p-2 text-gray-900 rounded-lg outline-none"
        />
      
          <div>
            {users && users.length > 0 && (
              <ul className="bg-white text-gray-900 rounded-lg p-2">
                {users?.map((user) => (
                  <li
                    className="transition-colors py-1 px-2 cursor-pointer hover:bg-gray-900 hover:text-white active:text-white"
                    key={user.id}
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            )}

            {search && users && users.length === 0 && (
              <p className="bg-white text-gray-900 rounded-lg p-2">
                {

                (isLoading)?"Loading...":"No users found"
                }
              </p>
            )}
          </div>
     
      </div>
     
    </div>
  );
};

export default Search;
