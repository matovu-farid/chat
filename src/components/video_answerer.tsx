import React, { useContext, useEffect, useRef, useState } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import { useRouter } from "next/router";
import useAnswerCall from "../hooks/useAnswerCall";
import { AnwerContext } from "../contexts/answer_ctx";

const VideoAnswerer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { leaveCall, hasLocalStream, localStream, answer,peerRef } =
    useContext(AnwerContext);

  const handleLeaveCall = () => {
    leaveCall();
    router.back();
  };
  useEffect(() => {
    answer();
    peerRef.current?.on("stream",(stream)=>{
      const videoElm = videoRef.current;
      if (videoElm) videoElm.srcObject = stream;
      console.log('remoteStream',stream)
    })
  }, []);
  const hasLocal = hasLocalStream();
  useEffect(() => {
    const videoElm = videoRef.current;
    if (videoElm) videoElm.srcObject = localStream();
    if (hasLocalStream()) console.log("local stream", localStream());
  }, [hasLocal]);

  return hasLocalStream() ? (
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
  ) : null;
};

export default VideoAnswerer;
