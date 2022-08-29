import React, { useContext, useEffect, useRef, useState } from "react";
import { AnwerContext } from "../contexts/answer_ctx";
import { getLocalStream } from "../utils/stream";
import VideoStreamer from "./Video";
import Peer from "simple-peer";

const VideoAnswerer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    leaveCall,
    hasLocalStream,
    localStream,
    answer,
    peerRef,
    localStreamRef,
    signalDataRef,
  } = useContext(AnwerContext);

  const handleLeaveCall = () => {
    leaveCall();
  };
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  useEffect(() => {
    if (hasLocalStream()) {
      answer();
      const peer = peerRef.current;
      setPeer(peer);
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
    console.log("answerer", signalDataRef.current);
  }, []);
  const hasLocal = hasLocalStream();
  const [_, setLocal] = useState<MediaStream | null>();

  useEffect(() => {
    const videoElm = videoRef.current;
    if (videoElm) videoElm.srcObject = localStream();
  }, [hasLocal]);

  return hasLocalStream() ? (
    <VideoStreamer
      handleLeaveCall={handleLeaveCall}
      peer={peer}
      videoRef={videoRef}
    />
  ) : null;
};

export default VideoAnswerer;
