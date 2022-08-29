
import React, { useEffect, useRef } from "react";
import useUser from "../hooks/useUser";
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
    if (hasLocalStream && localStream) {
      console.log(hasLocalStream,'localStream')
      console.log('calling.......................')
      call(callerId, calledId, localStream);
    }
  }, [hasLocalStream]);


  useEffect(() => {
    getLocalStream((stream) => setLocalStream({ stream, hasStream: true }));
  }, []);

  return localStream ? (
    <VideoStreamer
    hasLocalStream={hasLocalStream}
    hasRemoteStream={hasRemoteStream}
      peer={peer}
      handleLeaveCall={handleLeaveCall}
      remoteStream={remoteStream}
      localStream={localStream}
     
    />
  ) : null;
};

export default VideoCaller;
