/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import SignalData, { PeerObject, StreamObject } from "../Interfaces/SignalData";
import { createPeer } from "../utils/peer";

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
    stream: null,
  });
  const [localStreamObject, setLocalStream] = useState<StreamObject>({
    hasStream: false,
    stream: null,
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
    setLocalStream({ stream: null, hasStream: false });
    setRemoteStream({ stream: null, hasStream: false });
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

  const call = (callerId: string, calledId: string, stream: MediaStream) => {
    const peer = createPeer({ stream, innititor: true });
    setPeerObj({
      peer,
      new: true,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", { signal: data, from: callerId, to: calledId });
    });
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
      leaveCall(peer.destroy());
      socket.off("answered");
    });

    socket.on("answered", (data) => {
      console.log("answered again");
      peer.signal(data.signal);
    });
  };

  return {
    call,
    leaveCall,
    cancelCall,
    peer: peerObj.peer,
    isNewPeer: peerObj.new,
    hasLocalStream: localStreamObject.hasStream,
    setLocalStream,
    hasRemoteStream: remoteStreamObject.hasStream,
    setRemoteStream,
    localStream: localStreamObject.stream,
    remoteStream: remoteStreamObject.stream,
  };
};

export default useCall;