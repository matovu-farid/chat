import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import { PrivateMessege } from "../../Interfaces/Messege";
import socket from "../../utils/socket_init";
import Button from "../Button";
import TextField from "../TextField";
interface Props {
  receiverId:string,
  senderId:string,
  className?: string;
}
const PrivateMessegeTextField = ({receiverId,senderId,className }: Props) => {

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
