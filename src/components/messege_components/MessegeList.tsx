import React, { useEffect, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import { MessegeWithUser } from "../../Interfaces/Messege";
import { trpc } from "../../utils/trpc";
import TextMessege from "./TextMessege";
import { useInView } from "react-intersection-observer";
import socket from "../../utils/socket_init";
import { MessageEvent, SocketEvent } from "../../utils/events";

interface Props {
  roomId: string;
  className?: string;
}
const MessegeList = ({ className, roomId }: Props) => {
  const [messeges, setMesseges] = useState<MessegeWithUser[]>([]);
  const { ref: scrollRef, inView } = useInView();
  const ref = useRef<HTMLDivElement>(null);
  const user = useUser();

  const { fetchNextPage } = trpc.useInfiniteQuery(
    ["message.getPaginatedMesseges", { roomId }],
    {
      getNextPageParam: (lastpage) => lastpage.nextCursor,
      onSuccess(data) {
        let totalHistory: MessegeWithUser[] = [];
        data?.pages.forEach(({ messegeHistory }) => {
          totalHistory = [...messegeHistory, ...totalHistory];
        });
        setMesseges(totalHistory);
      },
    }
  );

  const scrollToBottom = () => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  const attachSocketListeners = async () => {
    await fetch("/api/socket");

    socket.on(SocketEvent.serverMessege, (msg) => {
      console.log(msg);
    });

    socket.on(MessageEvent.chat, (messegeString) => {
      const fetchedMessege = JSON.parse(messegeString);
      setMesseges((messeges) => [...messeges, fetchedMessege]);
      scrollToBottom();
    });
  };

  useEffect(() => {
    attachSocketListeners();
  }, [roomId, user.id]);

  return (
    <div className={className + " bg-gray-300"}>
      <ul className="flex flex-col gap-2 h-full max-h-[83vh] overflow-y-scroll">
        <div ref={scrollRef}></div>
        {messeges.map((messege, i) => {
          return (
            <TextMessege
              key={messege.id ?? i ?? messege.text}
              messege={messege}
            ></TextMessege>
          );
        })}
        <div className="float-left clear-both" ref={ref}></div>
      </ul>
    </div>
  );
};

export default MessegeList;
