
import React, { useEffect, useRef } from "react";
import useUser from "../hooks/useUser";
import useCall from "../hooks/useCall";
import { getLocalStream } from "../utils/stream";
import VideoStreamer from "./Video";
import usePeer from "../hooks/usePeer";

interface Props {
  calledId: string;
 
}

const VideoCaller = ({ calledId}: Props) => {
  const user = useUser();
  const callerId = user.id;

  
  const {
    leave,
    call,
    hasLocalStream,
    hasRemoteStream,
    localStream,
    remoteStream,
   
    peer,
  } = usePeer();
  const handleLeaveCall = () => {
    leave();
  };

 



  return localStream ? (
    <VideoStreamer
    hasLocalStream={hasLocalStream()}
    hasRemoteStream={hasRemoteStream()}
      peer={peer}
      handleLeaveCall={handleLeaveCall}
      remoteStream={remoteStream}
      localStream={localStream}
     
    />
  ) : null;
};

export default VideoCaller;
