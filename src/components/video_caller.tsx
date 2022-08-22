import React, { useEffect, useRef, useState } from "react";
import useUser from "../hooks/useUser";
import socket from "../utils/socket_init";
import Modal from "./Modal";
import Peer from "simple-peer";
import { GrClose } from "react-icons/gr";
import { usePeer } from "../contexts/peer";

interface Props {
  calledId: string;
  closePopup: () => void;
}

const VideoCaller = ({ calledId, closePopup }: Props) => {
  const user = useUser();
  const callerId = user.id;

  const videoRef = useRef<HTMLVideoElement>(null);
  const { leaveCall, call, setVideoToLocal, onStream } = usePeer();

  useEffect(() => {
    (async () => {
      await call(callerId, calledId);
      const videoElm = videoRef.current;
      if (videoElm) setVideoToLocal(videoElm);
      onStream((stream) => {
        if (videoElm) videoElm.srcObject = stream;
      });
    })();
  }, []);

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
