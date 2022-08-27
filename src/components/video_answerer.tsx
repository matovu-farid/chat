import React, { useEffect, useRef, useState } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import { useRouter } from "next/router";
import useAnswerCall from "../hooks/useAnswerCall";

const VideoAnswerer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    leaveCall,
    hasLocalStream,
    hasRemoteStream,
    localStream,
    remoteStream,
  } = useAnswerCall();

  const handleLeaveCall = () => {
    leaveCall();
    //router.back();
  };
  useEffect(() => {
    const videoElm = videoRef.current;
    // if (videoElm && localStream) videoElm.srcObject = localStream;
  }, [hasLocalStream]);
  useEffect(() => {
    const videoElm = videoRef.current;
    console.log("remote stream", remoteStream);
    if (videoElm && remoteStream) videoElm.srcObject = remoteStream;
  }, [hasRemoteStream]);

  return (
    <div className="text-lg fixed left-[40%] top-[20%]">
      <Paper className="mx-auto ">
        <video playsInline autoPlay ref={videoRef}></video>
        <div className="rounded-[50%] p-3 bg-red-600 absolute bottom-3 left-[48%]">
          <GrClose
            onClick={() => handleLeaveCall()}
            className="cursor-pointer "
          />
        </div>
      </Paper>
    </div>
  );
};

export default VideoAnswerer;
