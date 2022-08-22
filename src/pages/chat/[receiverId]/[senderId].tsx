import { useRouter } from "next/router";
import React from "react";
import Conversation from "../../../components/messege_components/Convesation";
import PrivateMessegeTextField from "../../../components/messege_components/PrivateTextfield";

const Chat = () => {
  const { query } = useRouter();
  const receiverId = query.receiverId as string;
  const senderId = query.senderId as string;

  return (
    <section className="w-full h-full flex flex-col justify-end">
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
