import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useSocket from "../../hooks/useSocket";
import useUser from "../../hooks/useUser";
import Messege, { MessegeWithUser } from "../../Interfaces/Messege";
import { trpc } from "../../utils/trpc";
import Loading from "../Loading";
import TextMessege from "./TextMessege";
interface Props {
  roomId: string;
  className?: string;
}
const MessegeList = ({  className,roomId }: Props) => {
  const [messeges, setMesseges] = useState<MessegeWithUser[]>([]);
  const user = useUser();
  const socket = useSocket();
  const {
    data: messegeHistory,
    isFetched,
    status,
    isLoading
  } = trpc.useQuery(["message.getMesseges", roomId]);
  useEffect(() => {
    if (isFetched && messegeHistory) {
      setMesseges(messegeHistory);
    }
  }, [status, roomId]);

  const ref = useRef<HTMLDivElement>(null)
  const scrollToBottom=()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  }
  useEffect(() => {
    socket.on("messege", (messegeString) => {
      const fetchedMessege = JSON.parse(messegeString);
      setMesseges((messeges) => [...messeges, fetchedMessege]);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [roomId, user.id]);
  useEffect(()=>{
    scrollToBottom()
  })
  if(isLoading) return <Loading></Loading>
  return (
    <div className={className + " bg-gray-300"}>
      <ul className="flex flex-col gap-2 h-full max-h-[83vh] overflow-y-scroll">
        {messeges.map((messege) => {
          return <TextMessege key={messege.id} messege={messege}></TextMessege>;
        })}
      <div className="float-left clear-both" ref={ref}></div>
      </ul>
    </div>
  );
};

export default MessegeList;
