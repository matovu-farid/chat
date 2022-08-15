import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from "./Button";
import Modal from "./Modal";
import User from "../Interfaces/User";
import { useRouter } from "next/router";
import Paper from "./Paper";
import ConfirmBox from "./ConfirmBox";
interface UserData {
  user: User|null,
  isShown: boolean
}

const Search = () => {
  const [search, setSearch] = useState("");
  const { data: users, isLoading } = trpc.useQuery(["user.searchUser", search]);
  const router = useRouter()
  const {roomId} = router.query
  const addToRoomMutation=trpc.useMutation(["room.addToRoom"])
  const [userData,setUserData]= useState<UserData>({
    user:null,
    isShown:false
  })
  
  const handleConfirm=()=>{
    const {user} = userData
    if( typeof roomId === 'string' && user)
    addToRoomMutation.mutate({userId:user.id,roomId})
    resetUserData()
   
  }
  const resetUserData=()=>{
    setUserData({
      user:null,
      isShown:false
    })
  }

  const handleUserClicked=(user:User)=>{
   
    setUserData({
      isShown:true,
      user
    })
  }

  return (
    <div className=" flex gap-2 fixed top-10 right-[250px]">
      <ConfirmBox onCancel={resetUserData} className="top-[30%] left-[40%]" title="Add User" content={`Are you sure you want to add this user to the room?`} isShown={userData.isShown} onConfirm={handleConfirm}></ConfirmBox>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" border-none p-2 text-gray-900 rounded-lg outline-none"
        />
     

        <div>
          {users && users.length > 0 && (
            <ul className="bg-white text-gray-900 flex flex-col rounded-lg p-2 shadow-md">
              {users?.map((user) => (
                
                <button
                onClick={()=>handleUserClicked(user)}
                  className="transition-colors my-0 px-2 rounded-lg cursor-pointer hover:bg-gray-900 hover:text-white active:text-white"
                  key={user.id}
                >
                  <div className="flex py-1 justify-start" >
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
