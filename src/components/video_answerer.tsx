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
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [hasRemoteStream, setHasRemoteStream] = useState(false);
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  useEffect(() => {
    if (hasLocalStream()) {
      answer();
      const peer = peerRef.current;

      if (peer) {
        peer.on("stream", (stream) => {
          setRemoteStream(stream);
          setHasRemoteStream(true);
        });
        peer.on("close", () => {
          handleLeaveCall();
        });
      }
      setPeer(peer);
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
      localStream={localStream()}
      remoteStream={remoteStream}
      hasRemoteStream={hasRemoteStream}
      hasLocalStream={hasLocalStream()}
    />
  ) : null;
};

export default VideoAnswerer;
