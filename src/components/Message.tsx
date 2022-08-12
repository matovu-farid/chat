import React, { useEffect, useMemo, useState } from "react";
import { UUID } from "uuid-generator-ts";

import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import Loading from "./Loading";
import Messege from "../Interfaces/Messege";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import useSocket from "../hooks/useSocket";



interface Props {
  roomId: string;
}
interface InternalProps extends Props {
  senderId: string;
  messegeHistory?: Messege[];
}
const MessegeComponent = ({ roomId }: Props) => {
  const { data } = useSession();
  const user = useMemo(()=>data?.user,[])
  
  const { data: messegeHistory } = trpc.useQuery([
    "message.getMesseges",
    roomId,
  ]);
  return user ? (
    <MessegeInternal
      messegeHistory={messegeHistory}
      roomId={roomId}
      senderId={user.id}
    ></MessegeInternal>
  ) : (
    <Loading></Loading>
  );
};
const MessegeInternal = ({
  roomId,
  senderId,
  messegeHistory,
}: InternalProps) => {
  const [serverMessege, setServerMessege] = useState("");
  const [messeges, setMesseges] = useState<Messege[]>(messegeHistory || []);
  const [messege, setMessege] = useState("");
  const {data: room} = trpc.useQuery(["room.getRoom",roomId]);
  const socket = useSocket()


  useEffect(() => {
    const addSocketListners=async()=>{
      socket.on("connect",()=>{
        const str = "---------------------------------------------------" 
        console.log(str)
        console.log("connect")
        console.log(str)
      })
      socket.on("serverMessege", (msg) => {
        setServerMessege(msg);
      });
      
      socket.on("messege", (messege: string) => {
        setMesseges((messeges) => {
          return [...messeges, { text: messege, roomId, senderId }];
        });
      });
    }
    addSocketListners()
  }, [roomId, senderId]);

  useEffect(() => {}, []);
  const handleSend = () => {
    if(room)
    socket.emit("sendMessege", room.path, messege);
  };

  return (
    <div className="w-full min-h-screen flex flex-col align-middle justify-center">
      <div className="flex flex-col gap-2 mx-auto w-2/12">
        <input
          className="w-full  py-2 px-3 border-none bg-purple-400 rounded-lg"
          type="text"
          value={messege}
          onChange={(e) => setMessege(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
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

export default MessegeComponent;
