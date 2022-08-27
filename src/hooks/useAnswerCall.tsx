/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import SignalData, { PeerObject, StreamObject } from "../Interfaces/SignalData";
import { useRouter } from "next/router";

const useAnswerCall = () => {
  const [signalData, setSignalData] = useState<SignalData | null>(null);
  const innitialPeer = new Peer({
    initiator: false,
    trickle: false,
  });
  const router = useRouter();
  const [peerObj, setPeerObj] = useState<PeerObject>({
    peer: innitialPeer,
    new: false,
  });
  const [remoteStreamObject, setRemoteStream] = useState<StreamObject>({
    hasStream: false,
  });
  const [localStreamObject, setLocalStream] = useState<StreamObject>({
    hasStream: false,
  });

  const cancelCall = (cleanup?: () => void) => {
    setLocalStream({ hasStream: false });
    setRemoteStream({ hasStream: false });
    peerObj.peer.destroy();
    setPeerObj((state) => ({ ...state, new: false }));

    if (signalData) socket.emit("callRejected", signalData.from);
    if (cleanup) cleanup();
  };

  const leaveCall = (cleanup?: () => void) => {
    const peer = peerObj.peer;
    if (peer) peer.destroy();

    remoteStreamObject?.stream?.getTracks().forEach((track) => {
      track.stop();
    });
    localStreamObject?.stream?.getTracks().forEach((track) => {
      track.stop();
    });
    setLocalStream({ hasStream: false });
    setRemoteStream({ hasStream: false });
    peerObj.peer.destroy();
    setPeerObj((state) => ({ ...state, new: false }));
    if (signalData) setSignalData(null);

    if (cleanup) cleanup();
  };

  const answer = (stream: MediaStream, signalData: SignalData) => {
    console.log("answering...........");
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.signal(signalData.signal);


    console.log("offer", signalData.signal);

    peer.on("signal", (data) => {
      console.log('onSignal',data)
      if (signalData) {
        socket.emit("answerCall", {
          signal: data,
          to: signalData.from,
          from: signalData.to,
        });
      }
    });

    peer.on("connect", () => {
      console.log("-----------------------------");
      console.log("Connected");
      console.log("-----------------------------");
    });
    peer.on("close", () => {
      leaveCall();
    });

    setPeerObj({
      peer,
      new: true,
    });
    router.push("/chat/video");
  };


  const hasLocalStream = localStreamObject.hasStream;
  const hasRemoteStream = remoteStreamObject.hasStream;


  return {
    answer,
    signalData,
    setSignalData,
    leaveCall,
    cancelCall,
    hasLocalStream,
    hasRemoteStream,
    setLocalStream,
    localStream: localStreamObject.stream,
    remoteStream: remoteStreamObject.stream,
  };
};

export default useAnswerCall;
