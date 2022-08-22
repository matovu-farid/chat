import React from "react";
import { AiFillPhone } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { usePeer } from "../contexts/peer";

const CallNotification = () => {
  const { cancelCall, answerCall } = usePeer();
  const handleAnswerCall=async()=>{
    const stream = await navigator.mediaDevices.getUserMedia({
      video:true, audio:true
    })
    answerCall(stream)
  }

  return (
    <div className="flex justify-center">
      <div className="flex gap-4 bg-gray-800  rounded-[30px] p-2">
        <div className="rounded-[50%] p-3 bg-red-600">
          <GrClose onClick={() => cancelCall()} className=" cursor-pointer" />
        </div>
        <div className="text-green-500 rounded-[50%] p-3 bg-white ">
          <AiFillPhone
            onClick={()=>handleAnswerCall()}
            className="cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};

export default CallNotification;
