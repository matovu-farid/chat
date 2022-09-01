import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { AiFillPlusCircle, AiOutlineClose } from "react-icons/ai";

import User from "../Interfaces/User";
import { useRouter } from "next/router";
import ConfirmBox from "./ConfirmBox";
import Modal from "./Modal";
import {toast} from 'react-toastify'


const RoomAdder = () => {
  const [search, setSearch] = useState("");
  const { data: users } = trpc.useQuery(["user.searchUser", search]);
  const router = useRouter();
  const { roomId } = router.query;
  const {mutate:addToRoom} = trpc.useMutation(["room.addToRoom"],{
    onError: ()=>{ 
      toast.dismiss()
      toast.error('Failed to add the user to the room')},
    onSuccess:()=>{ 
      toast.dismiss()
      toast.success('Successfully added the user to the room')},
    onMutate:()=>toast.loading('Adding the user to the room')
    
  });

  const handleUserClicked = (user: User) => {
    if (typeof roomId === "string" && user)
     addToRoom({ userId: user.id, roomId });
  };
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Modal>
      {showPopup || (
        <AiFillPlusCircle
          onClick={() => setShowPopup(true)}
          className="fixed left-64 top-[15%] text-4xl z-50 text-gray-900 hover:cursor-pointer hover:scale-125 hover:text-purple-600 active:text-purple-600 transition-all "
        ></AiFillPlusCircle>
      )}
      {showPopup && (
        <div className=" flex gap-2 fixed left-6 top-[15%]">
          <AiOutlineClose
            onClick={() => setShowPopup(false)}
            className="absolute right-2 top-2 cursor-pointer"
          ></AiOutlineClose>
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
      )}
    </Modal>
  );
};

export default RoomAdder;
