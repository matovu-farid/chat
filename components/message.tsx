import React, { useEffect, useState } from "react";
import { UUID } from "uuid-generator-ts";

import { io, Socket } from "socket.io-client";


let socket:Socket;
interface Messege {
  text: string;
  id: string;
}
const Message = ({ room }: { room: string }) => {
  const [serverMessege, setServerMessege] = useState("");
  const [messeges, setMesseges] = useState<Messege[]>([]);
  const [messege, setMessege] = useState("");
  useEffect(() => {
     socket = io("/api/socket");
    socket.on("welcome", (msg) => {
      setServerMessege(msg);
    });
    socket.on("messege", (messege: string) => {
      setMesseges((messeges) => {
        return [
          ...messeges,
          { text: messege, id: new UUID().getDashFreeUUID() },
        ];
      });
    });
  }, []);
  const handleSend=()=>{
    socket.emit("sendMessage",room,messege)
  }

  return (
    <div className="mx-auto">
      <div>
        <input
          className="w-full  py-2 px-4"
          type="text"
          value={messege}
          onChange={(e) => setMessege(e.target.value)}
        />
        <button 
        className="bg-blue-500
         text-white rounded-md shadow-none 
         active:bg-slate-600"
         onClick={handleSend}
         >
          Send
        </button>
      </div>

      <div>{serverMessege}</div>
      <ul>
        {messeges.map(({ text, id }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Message;
