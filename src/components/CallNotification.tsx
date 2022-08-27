import React, { useEffect } from "react";
import { AiFillPhone } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import useAnswerCall from "../hooks/useAnswerCall";
import SignalData from "../Interfaces/SignalData";
import socket from "../utils/socket_init";
interface Props {
  data: SignalData;
}

const CallNotification = ({ data }: Props) => {
  
  const { localStream,cancelCall, answer, setSignalData, signalData, leaveCall,setLocalStream } =useAnswerCall();
    const addStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      setLocalStream({ stream, hasStream: true });
    };
  useEffect(() => {
    setSignalData(data);

    socket.on("callRejected", () => {
      leaveCall();
    });
    addStream()
  }, []);

  

  return signalData && localStream ? (
    <div className="flex justify-center">
      <div className="flex gap-4 bg-gray-800  rounded-[30px] p-2">
        <div className="rounded-[50%] p-3 bg-red-600">
          <GrClose onClick={() => cancelCall()} className=" cursor-pointer" />
        </div>
        <div className="text-green-500 rounded-[50%] p-3 bg-white ">
          
          <AiFillPhone
            onClick={() => answer(localStream,data)}
            className="cursor-pointer "
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default CallNotification;
