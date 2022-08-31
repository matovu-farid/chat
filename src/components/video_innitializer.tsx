import React, { useContext, useEffect, useRef, useState } from "react";
import VideoStreamer from "./Video";
import usePeer from "../hooks/usePeer";
import { useRouter } from "next/router";

const VideoComponent = () => {
  const {
    leave,
    hasLocalStream,
    localStream,
    peer,
    remoteStream,
    addLocalStream,
    hasRemoteStream,
  } = usePeer();
  const router = useRouter();

  useEffect(() => {
    addLocalStream();
  }, []);
  const handleLeave = () => {
    leave();
    router.push("/");
  };

  return hasLocalStream() ? (
    <VideoStreamer
      handleLeaveCall={handleLeave}
      peer={peer}
      localStream={localStream}
      remoteStream={remoteStream}
      hasRemoteStream={hasRemoteStream()}
      hasLocalStream={hasLocalStream()}
    />
  ) : null;
};

export default VideoComponent;
