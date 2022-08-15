import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from "./Button";
import Modal from "./Modal";
import User from "../Interfaces/User";
import { useRouter } from "next/router";
import Paper from "./Paper";

const Search = () => {
  const [search, setSearch] = useState("");
  const { data: users, isLoading } = trpc.useQuery(["user.searchUser", search]);
  const router = useRouter()
  const {roomId} = router.query
  const addToRoomMutation=trpc.useMutation(["room.addToRoom"])
  const [showPopup,setShowPopup] = useState(false)
  const onConfirm=(user:User)=>{
    if( typeof roomId === 'string' )
    addToRoomMutation.mutate({userId:user.id,roomId})
  }

  const handleUserClicked=(user:User)=>{
   
    setShowPopup(true)
  }

  return (
    <div className=" flex gap-2 fixed top-10 right-[250px]">
      {

        (showPopup)&&(<Paper>
          
        </Paper>)
      }
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" border-none p-2 text-gray-900 rounded-lg outline-none"
        />
     

        <div>
          {users && users.length > 0 && (
            <ul className="bg-white text-gray-900 rounded-lg p-2 shadow-md">
              {users?.map((user) => (
                
                <button
                onClick={()=>handleUserClicked(user)}
                  className="transition-colors my-0 px-2 rounded-lg cursor-pointer hover:bg-gray-900 hover:text-white active:text-white"
                  key={user.id}
                >
                  <div className="flex py-1" >
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
              {isLoading ? "Loading..." : "No users found"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
