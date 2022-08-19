import React, { useEffect, useState } from "react";
import useRooms from "../../hooks/useRooms";
import useSocket from "../../hooks/useSocket";
import Messege from "../../Interfaces/Messege";
import Button from "../Button";
import TextField from "../TextField";
interface Props {
  roomId: string;
  senderId: string;
  className?: string;
}
const MessegeTextField = ({ roomId, senderId, className }: Props) => {
  const { data: room } = useRooms();
  const socket = useSocket();
  const [messege, setMessege] = useState("");
  const handleSend = () => {
    if(messege=== '') return
    const createdMessege: Messege = {
      text: messege,
      roomId,
      senderId,
    };
    if (room) socket.emit("sendMessege", room, createdMessege);
    else throw "No room found";
    setMessege("")
  };


  return (
    <div className={className + " py-3"}>
      <div className="flex justify-center gap-2">
        <TextField
          placeholder="messege...."
          value={messege}
          setValue={setMessege}
        />
        <Button  onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default MessegeTextField;
