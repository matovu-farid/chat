import React, { useEffect, useRef, useState } from "react";
import useUser from "../hooks/useUser";
import { GrClose } from "react-icons/gr";
import useCall from "../hooks/useCall";
import { getLocalStream } from "../utils/stream";
import VideoStreamer from "./Video";

interface Props {
  calledId: string;
  closePopup: () => void;
}

const VideoCaller = ({ calledId, closePopup }: Props) => {
  const user = useUser();
  const callerId = user.id;

  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    leaveCall,
    call,
    hasLocalStream,
    hasRemoteStream,
    localStream,
    remoteStream,
    setLocalStream,
    peer,
  } = useCall();
  const handleLeaveCall = () => {
    leaveCall();
  };

  useEffect(() => {
    const videoElm = videoRef.current;
    if (videoElm && localStream) {
      videoElm.srcObject = localStream;
      call(callerId, calledId, localStream);
    }
  }, [hasLocalStream]);
  useEffect(() => {
    const videoElm = videoRef.current;
    if (videoElm && remoteStream) videoElm.srcObject = remoteStream;
  }, [hasRemoteStream]);

  useEffect(() => {
    getLocalStream((stream) => setLocalStream({ stream, hasStream: true }));
  }, []);

  return localStream ? (
    <VideoStreamer
      peer={peer}
      handleLeaveCall={handleLeaveCall}
      videoRef={videoRef}
    />
  ) : null;
};

export default VideoCaller;
