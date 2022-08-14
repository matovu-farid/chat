import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import Modal from "./Modal";

const Search = () => {
  const [search, setSearch] = useState("");
  const { data: users } = trpc.useQuery(["user.searchUser", search]);
  const utils = trpc.useContext();

  const handleSearch = () => {
    utils.invalidateQueries(["user.searchUser"]);
  };

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
                    className="py-1 px-2 hover:text-purple-700 active:text-purple-700 "
                    key={user.id}
                  >
                    {user.name}
                  </li>
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
      <div>
        <Button className="flex-grow-0" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
