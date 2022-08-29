import React, { useContext, useEffect, useRef, useState } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import { useRouter } from "next/router";
import { AnwerContext } from "../contexts/answer_ctx";
import { getLocalStream } from "../utils/stream";

const VideoAnswerer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const {
    leaveCall,
    hasLocalStream,
    localStream,
    answer,
    peerRef,
    localStreamRef,
  } = useContext(AnwerContext);

  const handleLeaveCall = () => {
    leaveCall();
    router.back();
  };
  useEffect(() => {
    if (hasLocalStream()) {
      answer();
      const peer = peerRef.current;
      if (peer) {
        peer.on("stream", (stream) => {
          const videoElm = videoRef.current;
          if (videoElm) videoElm.srcObject = stream;
          console.log("remoteStream", stream);
        });
        peer.on("close", () => {
          handleLeaveCall();
        });
      }
    }
  }, [hasLocalStream()]);
  useEffect(() => {
    getLocalStream((stream) => {
      localStreamRef.current = stream;
      setLocal(stream);
    });
  }, []);
  const hasLocal = hasLocalStream();
  const [_, setLocal] = useState<MediaStream | null>();

  useEffect(() => {
    const videoElm = videoRef.current;
    if (videoElm) videoElm.srcObject = localStream();
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
