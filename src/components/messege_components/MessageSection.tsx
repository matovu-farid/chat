import React from "react";

import MessegeTextField from "./MessegeTextField";
import MessegeList from "./MessegeList";
import useUser from "../../hooks/useUser";
import Modal from "../Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import RoomAdder from "../RoomsAdder";

interface Props {
  roomId: string;
}

const MessegeSection = ({ roomId }: Props) => {
  const user = useUser();

  return (
    <section className="w-full h-full flex flex-col justify-end">
      <RoomAdder></RoomAdder>
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
