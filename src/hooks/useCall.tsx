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

  const call = (callerId: string, calledId: string, stream: MediaStream) => {
    const peer = new Peer({
      stream,
      initiator: true,
      trickle: false,
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
      leaveCall();
    });

    socket.on("answered", (data) => {
      peer.signal(data.signal);
      console.log(peer);
    });
  };
  // const addNewStream = (stream: MediaStream) => {
  //   const peer = peerObj.peer;
  //   peer.addStream(stream);
  //   console.log(peer);
  //   setPeerObj((state) => ({ ...state, new: false }));
  // };

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
