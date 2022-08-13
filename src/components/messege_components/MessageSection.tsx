import React, { useEffect, useMemo, useState } from "react";

import { useSession } from "next-auth/react";
import Loading from "../Loading";
import Messege, { MessegeWithUser } from "../../Interfaces/Messege";
import { trpc } from "../../utils/trpc";
import useSocket from "../../hooks/useSocket";
import { useRouter } from "next/router";
import MessegeTextField from "./MessegeTextField";
import MessegeList from "./MessegeList";
import useUser from "../../hooks/useUser";

interface Props {
  roomId: string;
}
interface InternalProps extends Props {
  senderId: string;
  messegeHistory: MessegeWithUser[];
}
const MessegeComponent = ({ roomId }: Props) => {
  const user = useUser()
  const [messegeHistory,setMessegeHistory] = useState< MessegeWithUser[]>([])

  const { data: messegeHistoryFetched,status } = trpc.useQuery([
    "message.getMesseges",
    roomId,
  ]);
  useEffect(()=>{
    if(status==="success" &&  messegeHistoryFetched){
      setMessegeHistory(messegeHistoryFetched)
    }
  },[status,roomId])

  return status ==="success" ? (
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
  const [messeges, setMesseges] = useState<MessegeWithUser[]>([]);
  
  
  const socket = useSocket();
  const dynamicRoute = useRouter().asPath;
  useEffect(()=>{
    setMesseges(messegeHistory)
  },[messegeHistory.length])
  useEffect(() => {
    setMesseges(messegeHistory || []); // When the dynamic route change reset the state
  }, [dynamicRoute]);

  useEffect(() => {
    const addSocketListners = async () => {
      socket.on("messege", (messegeString) => {
        const fetchedMessege = JSON.parse(messegeString);
        console.log(fetchedMessege);

        setMesseges((messeges) => [...messeges, fetchedMessege]);
      });
    };
    addSocketListners();
    return () => {
      socket.removeAllListeners();
    };
  }, [roomId, senderId]);

 

  return (
    <section className="w-full h-full flex flex-col justify-end">
     <MessegeList className="h-full" messeges={messeges}></MessegeList>
     <MessegeTextField className=" flex-none w-full" senderId={senderId} roomId={roomId}></MessegeTextField>

    </section>
  );
};

export default MessegeComponent;
