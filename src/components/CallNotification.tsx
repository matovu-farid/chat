import React, { useContext, useEffect, useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { AnwerContext } from "../contexts/answer_ctx";
import useAnswerCall from "../hooks/useAnswerCall";
import SignalData from "../Interfaces/SignalData";
import socket from "../utils/socket_init";
import Modal from "./Modal";
import Page from "./page";
import Paper from "./Paper";
import VideoAnswerer from "./video_answerer";
interface Props {
  data: SignalData;
}

const CallNotification = ({ data }: Props) => {
  const {
    localStream,
    cancelCall,
    answer,
    setSignalData,
    signalData,
    leaveCall,
    setLocalStream,
  } = useContext(AnwerContext);
  const addStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream({ stream, hasStream: true });
  };
  useEffect(() => {
    setSignalData(data);

    socket.on("callRejected", () => {
      leaveCall();
    });
    addStream();
  }, []);
  const handleAnswer = (localStream: MediaStream) => {
    answer(localStream, data);
  };
  console.log('signaldata',data)
  console.log('localstream',localStream)

  return signalData && localStream ? (
    <div className="flex justify-center">
      <div className="flex gap-4 bg-gray-800  rounded-[30px] p-2">
        <div className="rounded-[50%] p-3 bg-red-600">
          <GrClose onClick={() => cancelCall()} className=" cursor-pointer" />
        </div>
        <button
          onClick={() => handleAnswer(localStream)}
          className="text-green-500 rounded-[50%] p-3 bg-white "
        >
          <AiFillPhone
            onClick={() => handleAnswer(localStream)}
            className="cursor-pointer "
          />
        </button>
      </div>
    </div>
  ) : null;
};

export default CallNotification;
