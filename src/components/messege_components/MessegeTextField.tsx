import React, { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import Messege from "../../Interfaces/Messege";
import { trpc } from "../../utils/trpc";
import Button from "../Button";
interface Props {
  roomId: string;
  senderId: string;
  className?: string;
}
const MessegeTextField = ({ roomId, senderId, className }: Props) => {
  const { data: room } = trpc.useQuery(["room.getRoom", roomId]);
  const socket = useSocket();
  const [messege, setMessege] = useState("");
  const handleSend = () => {
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
        <input
          type="text"
          placeholder="messege...."
          className=" w-full max-w-md py-2 px-3 border-none bg-gray-700 outline-none border-none text-white rounded-lg"
          value={messege}
          onChange={(e) => setMessege(e.target.value)}
        />
        <Button  onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default MessegeTextField;
