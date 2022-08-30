/* eslint-disable @typescript-eslint/no-empty-function */
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import SignalData, { PeerObject, StreamObject } from "../Interfaces/SignalData";

const useAnswerCall = () => {
  const cancelCall = (signalData: SignalData | null, cleanup?: () => void) => {
    if (signalData) socket.emit("callRejected", signalData.from);
    if (cleanup) cleanup();
  };

  const leaveCall = (
    remoteStream: MediaStream | null,
    localStream: MediaStream | null,
    peer: Peer.Instance | null,
    cleanup?: () => void
  ) => {
    if (peer) peer.destroy();

    remoteStream?.getTracks().forEach((track) => {
      track.stop();
    });
    localStream?.getTracks().forEach((track) => {
      track.stop();
    });

    if (cleanup) cleanup();
  };

  return {
    leaveCall,
    cancelCall,
  };
};

export default useAnswerCall;
