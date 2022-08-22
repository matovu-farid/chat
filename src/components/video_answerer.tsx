import React, { useEffect, useRef, useState } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import { usePeer } from "../contexts/peer";
import { useRouter } from "next/router";

const VideoAnswerer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setVideoToLocal, leaveCall, onStream } = usePeer();
  const router = useRouter();

  useEffect(() => {
    const videoElm = videoRef.current;
    videoElm && setVideoToLocal(videoElm);
    onStream((stream) => {
      if (videoElm) videoElm.srcObject = stream;
    });
  }, []);
  const handleLeaveCall = () => {
    leaveCall();
    router.back();
  };

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
