import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import usePeer from "../hooks/usePeer";
import useUser from "../hooks/useUser";
import Modal from "./Modal";
import Paper from "./Paper";
import VideoCaller from "./video_caller";

interface Props {
  calledId: string;
}
const VideoAdder = ({ calledId }: Props) => {
  const user = useUser()
  const router = useRouter()
  const {addCallInfo} = usePeer();

  const handleCall=()=>{
    const callerId = user.id
    addCallInfo({callerId,calledId})
    router.push('/chat/video')
  }

  return (
    <Modal>
     
        <AiFillPlusCircle
          onClick={() => handleCall()}
          className="fixed left-6 top-[15%] text-4xl z-50 text-gray-900 hover:cursor-pointer hover:scale-125 hover:text-purple-600 active:text-purple-600 transition-all "
        ></AiFillPlusCircle>
      
     
    </Modal>
  );
};

export default VideoAdder;
