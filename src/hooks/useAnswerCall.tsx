/* eslint-disable @typescript-eslint/no-empty-function */
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import SignalData, { PeerObject, StreamObject } from "../Interfaces/SignalData";
import { useRouter } from "next/router";

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
  const createPeer = (stream: MediaStream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:openrelay.metered.ca:80",
          },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443?transport=tcp",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
      },
    });
    return peer;
  };

  return {
    leaveCall,
    cancelCall,
    createPeer,
  };
};

export default useAnswerCall;
