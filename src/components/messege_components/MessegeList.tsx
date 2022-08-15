import React, { useEffect, useRef, useState } from "react";
import Messege, { MessegeWithUser } from "../../Interfaces/Messege";
import { trpc } from "../../utils/trpc";
import TextMessege from "./TextMessege";
interface Props {
  messeges: MessegeWithUser[];
  className?: string;
}
const MessegeList = ({messeges,  className }: Props) => {
  // const [messeges, setMesseges] = useState<MessegeWithUser[]>([]);
  // const {
  //   data: messegeHistory,
  //   isFetched,
  //   status,
  //   isLoading
  // } = trpc.useQuery(["message.getMesseges", roomId]);
  const ref = useRef<HTMLDivElement>(null)
  const scrollToBottom=()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  }
  useEffect(()=>{
    scrollToBottom()
  })
  return (
    <div className={className + ""}>
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
