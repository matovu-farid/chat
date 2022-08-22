import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Conversation from "../../../components/messege_components/Convesation";
import PrivateMessegeTextField from "../../../components/messege_components/PrivateTextfield";
import Modal from "../../../components/Modal";
import VideoAdder from '../../../components/VideoAdder'

const Chat = () => {
  const { query } = useRouter();
  const receiverId = query.receiverId as string;
  const senderId = query.senderId as string;


  return (
    <section className="w-full h-full flex flex-col justify-end">
      <VideoAdder calledId={receiverId} ></VideoAdder>
      <Conversation
        receiverId={receiverId}
        senderId={senderId}
        className="h-full"
      />
      <PrivateMessegeTextField
        className=" flex-none w-full"
        receiverId={receiverId}
        senderId={senderId}
      />
    </section>
  );
};

export default Chat;
