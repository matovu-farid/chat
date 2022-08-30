import React, { useContext, useEffect, useRef, useState } from "react";
import VideoStreamer from "./Video";
import Peer from "simple-peer";
import usePeer from "../hooks/useAnswer";

const VideoAnswerer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    leave,
    hasLocalStream,
    localStream,
    answer,
    peer,
    remoteStream,
    addLocalStream,
    hasRemoteStream,
  } = usePeer();

  const handleLeaveCall = () => {
    leave();
  };
  useEffect(() => {
    if (hasLocalStream()) {
      const videoElm = videoRef.current;
      if (videoElm) videoElm.srcObject = localStream;
    }
  }, [hasLocalStream()]);
  useEffect(() => {
    if (hasRemoteStream()) {
      const videoElm = videoRef.current;
      if (videoElm) videoElm.srcObject = remoteStream;
    }
  }, [hasRemoteStream()]);

  useEffect(() => {
    (async () => {
      await addLocalStream();
    })();
  }, []);

  return hasLocalStream() ? (
    <VideoStreamer
      handleLeaveCall={handleLeaveCall}
      peer={peer}
      localStream={localStream}
      remoteStream={remoteStream}
      hasRemoteStream={hasRemoteStream()}
      hasLocalStream={hasLocalStream()}
    />
  ) : null;
};

export default VideoAnswerer;
