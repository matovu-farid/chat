import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Messege from "../../Interfaces/Messege";
import socket from "../../utils/socket_init";
import { trpc } from "../../utils/trpc";
import Button from "../Button";
import TextField from "../TextField";
interface Props {
  roomId: string;
  senderId: string;
  className?: string;
}
const MessegeTextField = ({ roomId, senderId, className }: Props) => {

  const { data: room } = trpc.useQuery(["room.getRoom",roomId]);
  const [messege, setMessege] = useState("");
  const sendMessege= async(messege:Messege)=>{
    await fetch('/api/socket')
    
    socket.emit("sendMessege", room, messege)
  }
  const handleSend = () => {
    if(messege=== '') return
    const createdMessege: Messege = {
      text: messege,
      roomId,
      senderId,
    };

  
    if (room) sendMessege(createdMessege)
    else throw "No room found";
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

export default MessegeTextField;
