import React, { useEffect, useMemo, useState } from "react";

import { useSession } from "next-auth/react";
import Loading from "./Loading";
import Messege from "../Interfaces/Messege";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import useSocket from "../hooks/useSocket";
import { useRouter } from "next/router";

interface Props {
  roomId: string;
}
interface InternalProps extends Props {
  senderId: string;
  messegeHistory?: Messege[];
}
const MessegeComponent = ({ roomId }: Props) => {
  const { data } = useSession();
  const user = data?.user;

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
  const [serverMesseges, setServerMessege] = useState<string[]>([]);
  const [messeges, setMesseges] = useState<Messege[]>(messegeHistory || []);
  const [messege, setMessege] = useState("");
  const { data: room } = trpc.useQuery(["room.getRoom", roomId]);
  const socket = useSocket();
  const dynamicRoute = useRouter().asPath;
  useEffect(() => {
    setMesseges([]); // When the dynamic route change reset the state
  }, [dynamicRoute]);


  useEffect(() => {
    const addSocketListners = async () => {
      socket.on("serverMessege", (msg) => {
        setServerMessege((state) => [...state, msg]);
      });

      socket.on("messege", (messegeString) => {
        const fetchedMessege= JSON.parse(messegeString);
        console.log(fetchedMessege)
      
          setMesseges((messeges) => [
            ...messeges,
            fetchedMessege,
          ]);
        
      });
    };
    addSocketListners();
    return () => {
      socket.removeAllListeners();
    };
  }, [roomId, senderId]);

  const handleSend = () => {
    const createdMessege:Messege = {
     text:messege,
     roomId,
     senderId
    }
    if (room) socket.emit("sendMessege", room,createdMessege);
    else throw "No room found";
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

      <ul>
        {messeges.map(({ text }, id) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessegeComponent;
