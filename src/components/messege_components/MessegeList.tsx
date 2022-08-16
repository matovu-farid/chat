import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useSocket from "../../hooks/useSocket";
import useUser from "../../hooks/useUser";
import Messege, { MessegeWithUser } from "../../Interfaces/Messege";
import { trpc } from "../../utils/trpc";
import Loading from "../Loading";
import TextMessege from "./TextMessege";
import { useInView } from "react-intersection-observer";

interface Props {
  roomId: string;
  className?: string;
}
const MessegeList = ({ className, roomId }: Props) => {
  const [messeges, setMesseges] = useState<MessegeWithUser[]>([]);
  const { ref: scrollRef, inView, entry } = useInView();
  const ref = useRef<HTMLDivElement>(null);
  const user = useUser();
  const socket = useSocket();
  const [loaded, setLoaded] = useState(false);
  const { data, isFetched, status, isLoading, fetchNextPage } =
    trpc.useInfiniteQuery(["message.getPaginatedMesseges", { roomId }], {
      getNextPageParam: (lastpage) => lastpage.nextCursor,
    });

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, []);

  useEffect(() => {
    if (inView && loaded) {
      fetchNextPage();
    }
  }, [inView]);
  useEffect(() => {
    if (isFetched) {
      let totalHistory: MessegeWithUser[] = [];
      data?.pages.forEach(({ messegeHistory }) => {
        totalHistory = [...messegeHistory, ...totalHistory];
      });
      setMesseges(totalHistory);
    }
  }, [status, roomId, data?.pages.length]);

  useEffect(() => {
    socket.on("messege", (messegeString) => {
      const fetchedMessege = JSON.parse(messegeString);
      setMesseges((messeges) => [...messeges, fetchedMessege]);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [roomId, user.id]);

  if (isLoading) return <Loading></Loading>;
  return (
    <div className={className + " bg-gray-300"}>
      <ul className="flex flex-col gap-2 h-full max-h-[83vh] overflow-y-scroll">
        <div ref={scrollRef}></div>
        {messeges.map((messege) => {
          return <TextMessege key={messege.id} messege={messege}></TextMessege>;
        })}
        <div className="float-left clear-both" ref={ref}></div>
      </ul>
    </div>
  );
};

export default MessegeList;
