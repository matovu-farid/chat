import React, { useEffect, useRef, useState } from "react";
import useUser from "../hooks/useUser";
import { GrClose } from "react-icons/gr";
import useAnswerCall from "../hooks/useAnswerCall";
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
    peer,
    setLocalStream,
    setRemoteStream,
  } = useCall();
  useEffect(() => {
    const stream = localStream;
    if (stream) {
      peer.addStream(stream);
    }
    setLocalStream((state) => ({ ...state, new: false }));
  }, [hasLocalStream]);
  useEffect(() => {
    const stream = remoteStream;
    if (stream) {
      peer.addStream(stream);
    }
    setRemoteStream((state) => ({ ...state, new: false }));
  }, [hasRemoteStream]);
  useEffect(() => {
    const videoElm = videoRef.current;
   // if (videoElm && localStream) videoElm.srcObject = localStream;
  }, [hasLocalStream]);
  useEffect(() => {
    const videoElm = videoRef.current;
    if (videoElm && remoteStream) videoElm.srcObject = remoteStream;
  }, [hasRemoteStream]);

  useEffect(() => {
    call(callerId, calledId);
  }, []);
  const handleLeave = () => {
    ("");
  };

  return (
    <>
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
    </>
  );
};

export default VideoCaller;
