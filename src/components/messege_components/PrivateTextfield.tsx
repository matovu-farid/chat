import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import useUser from "../../hooks/useUser";
import Messege, { Conversation, PrivateMessege } from "../../Interfaces/Messege";
import socket from "../../utils/socket_init";
import { trpc } from "../../utils/trpc";
import Button from "../Button";
import TextField from "../TextField";
interface Props {
  conversation: Conversation,
  className?: string;
}
const PrivateMessegeTextField = ({ conversation:{receiverId,senderId},className }: Props) => {

  const [messege, setMessege] = useState("");
  const user = useUser()
  const sendMessege= async(messege:PrivateMessege)=>{
    await fetch('/api/socket')
    
    socket.emit("sendPrivateMessage", messege)
  }
  const handleSend = () => {
    if(messege=== '') return
    const createdMessege = {
      text: messege,
      receiverId,
      senderId,
      sender: user
    };

  
    sendMessege(createdMessege)
  
    setMessege("")
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {

    if (event.key === 'Enter') {
     handleSend()
    }
  };


  return (
    <div className={className + " py-3"}>
      <div className="flex justify-center gap-2">
        <TextField
          placeholder="messege...."
          onKeyDown={handleKeyDown}
          value={messege}
          setValue={setMessege}
        />
        <Button  onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default PrivateMessegeTextField;
