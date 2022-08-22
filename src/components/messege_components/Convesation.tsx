import React, { useEffect, useRef, useState } from "react";
import { PrivateMessegeWithUser } from "../../Interfaces/Messege";
import { trpc } from "../../utils/trpc";
import TextMessege from "./TextMessege";
import { useInView } from "react-intersection-observer";
import socket from "../../utils/socket_init";

interface Props {
  className?: string;
  senderId: string;
  receiverId: string;

}
const Conversation = ({ className,senderId,receiverId }: Props) => {
  const [messeges, setMesseges] = useState<PrivateMessegeWithUser[]>([]);
  const { ref: scrollRef, inView } = useInView();
  const ref = useRef<HTMLDivElement>(null);

  const { fetchNextPage } = trpc.useInfiniteQuery(
    ["message.getPaginatedConversation", { senderId,receiverId }],
    {
      getNextPageParam: (lastpage) => lastpage.nextCursor,
      onSuccess(data) {
        let totalHistory: PrivateMessegeWithUser[] = [];
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  const attachSocketListeners = async () => {
    await fetch("/api/socket");
    socket.on("privateChat", (messegeString) => {
      console.log(JSON.parse(messegeString))
      const fetchedMessege = JSON.parse(messegeString);
      setMesseges((messeges) => [...messeges, fetchedMessege]);
      scrollToBottom();
    });
  };

  useEffect(() => {
    attachSocketListeners();
  }, [senderId, receiverId]);

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

export default Conversation;
