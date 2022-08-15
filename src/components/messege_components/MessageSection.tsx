import React from "react";



import MessegeTextField from "./MessegeTextField";
import MessegeList from "./MessegeList";
import useUser from "../../hooks/useUser";
import Modal from "../Modal";
import { AiFillPlusCircle } from "react-icons/ai";

interface Props {
  roomId: string;
}

const MessegeSection = ({ roomId }: Props) => {
  const user = useUser();
  
  const handleOnClick = () => {};
 

  return (
    <section className="w-full h-full flex flex-col justify-end">
      <Modal>
        <AiFillPlusCircle
          onClick={handleOnClick}
          className="text-4xl z-50 text-gray-900 hover:cursor-pointer hover:text-purple-600 active:text-purple-600 transition-colors  fixed left-6 top-1/4"
        ></AiFillPlusCircle>
      </Modal>
      <MessegeList className="h-full" roomId={roomId}></MessegeList>
      <MessegeTextField
        className=" flex-none w-full"
        senderId={user.id}
        roomId={roomId}
      ></MessegeTextField>
    </section>
  );
};

export default MessegeSection;
