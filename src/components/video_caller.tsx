import React, { useEffect, useRef, useState } from "react";
import useUser from "../hooks/useUser";
import { GrClose } from "react-icons/gr";
import useCall from "../hooks/useCall";

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
  } = useCall();
  

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
  const addStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream({ stream, hasStream: true });
  };
  useEffect(() => {
    addStream();
  }, []);

  return localStream ? (
    <div>
      <div className="text-lg rounded-[50%] p-2 bg-red-600   absolute bottom-3 left-[48%]">
        <GrClose
          onClick={() => leaveCall(closePopup)}
          className="cursor-pointer text-yellow-200"
        />
      </div>
      <video
        className="pointer-events-none"
        playsInline
        autoPlay
        ref={videoRef}
      ></video>
    </div>
  ) : null;
};

export default VideoCaller;
