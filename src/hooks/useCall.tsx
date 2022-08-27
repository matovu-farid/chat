/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import SignalData, { PeerObject, StreamObject } from "../Interfaces/SignalData";

const useCall = () => {
  const [signalData, setSignalData] = useState<SignalData | null>(null);
  const initialPeer = new Peer({
    initiator: true,
    trickle: false,
  });
  const [peerObj, setPeerObj] = useState<PeerObject>({
    peer: initialPeer,
    new: false,
  });
  const [remoteStreamObject, setRemoteStream] = useState<StreamObject>({
    hasStream: false,
  });
  const [localStreamObject, setLocalStream] = useState<StreamObject>({
    hasStream: false,
  });

  useEffect(() => {
    socket.on("called", (data: SignalData) => {
      setSignalData(data);
    });
    socket.on("callRejected", () => {
      leaveCall();
    });
  }, []);
  const cancelCall = (cleanup?: () => void) => {
    setLocalStream({ hasStream: false });
    setRemoteStream({ hasStream: false });
    peerObj.peer.destroy();
    setPeerObj((state) => ({ ...state, new: false }));
    if (cleanup) cleanup();
  };

  const leaveCall = (cleanup?: () => void) => {
    remoteStreamObject?.stream?.getTracks().forEach((track) => {
      track.stop();
    });
    localStreamObject?.stream?.getTracks().forEach((track) => {
      track.stop();
    });

    if (signalData) setSignalData(null);
    cancelCall();

    if (cleanup) cleanup();
  };

  const attachListeners = () => {
    const peer = peerObj.peer;
    peer.on("stream", (stream) => {
      console.log("stream got", stream);
      setRemoteStream({ stream, hasStream: true });
    });
    peer.on("connect", () => {
      console.log("-----------------------------");
      console.log("Connected");
      console.log("-----------------------------");
    });
    peer.on("close", () => {
      console.log("closed");
      leaveCall();
    });
  };

  const call = (callerId: string, calledId: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    console.log(peer);

    peer.on("signal", (data) => {
      socket.emit("callUser", { signal: data, from: callerId, to: calledId });
      console.log("original signal", data);
    });
    attachListeners();

    socket.on("answered", (data) => {
      console.log("anwser", data.signal);
      const peer = peerObj.peer;
      peer.signal(data.signal);
    });
    setPeerObj({
      peer,
      new: true,
    });
  };

  return {
    call,
    leaveCall,
    cancelCall,
    peer: peerObj.peer,
    hasLocalStream: localStreamObject.hasStream,
    setLocalStream,
    hasRemoteStream: remoteStreamObject.hasStream,
    setRemoteStream,
    localStream: localStreamObject.stream,
    remoteStream: remoteStreamObject.stream,
  };
};

export default useCall;
