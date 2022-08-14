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
import { createPortal } from "react-dom";
import Modal from "../Modal";

interface Props {
  roomId: string;
}

const MessegeComponent = ({ roomId }: Props) => {
  const user = useUser();

  const [messeges, setMesseges] = useState<MessegeWithUser[]>([]);

  const { data: messegeHistory, isFetched,status } = trpc.useQuery([
    "message.getMesseges",
    roomId,
  ]);
  const socket = useSocket();
  const pathname = useRouter().asPath

  useEffect(() => {
    if (isFetched && messegeHistory) {
      setMesseges(messegeHistory);
    }
  }, [status, pathname]);

  useEffect(() => {
    socket.on("messege", (messegeString) => {
      const fetchedMessege = JSON.parse(messegeString);
      setMesseges((messeges) => [...messeges, fetchedMessege]);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [roomId, user.id]);


  return (
    <section className="w-full h-full flex flex-col justify-end">
      <Modal></Modal>
      <MessegeList className="h-full" messeges={messeges}></MessegeList>
      <MessegeTextField
        className=" flex-none w-full"
        senderId={user.id}
        roomId={roomId}
      ></MessegeTextField>
    </section>
  );
};


export default MessegeComponent;
