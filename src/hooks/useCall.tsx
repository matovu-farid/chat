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
  const setVideoLocal = (video: HTMLVideoElement) => {
    const stream = localStreamObject.stream;
    if (stream) video.srcObject = stream;
  };
  const setVideoRemote = (video: HTMLVideoElement) => {
    const stream = remoteStreamObject.stream;
    if (stream) video.srcObject = stream;
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
  
  const attachListeners=()=>{
    const peer = peerObj.peer
    peer.on("stream", (stream) => {
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

  }

  const call = (callerId: string, calledId: string) => {
    
    const peer = peerObj.peer
    peer.on("signal", (data) => {
      socket.emit("callUser", { signal: data, from: callerId, to: calledId });
    });
    attachListeners()

    socket.on("answered", (data) => {
      console.log(data)
      const peer = peerObj.peer
      console.log(peer)
      peer.signal(data.signal);
    });
    setPeerObj({
      peer,
      new: true,
    });
  };
  // add the local stream when there is a new peer
  useEffect(() => {
    if (peerObj.new) {
      const addStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream({ stream, hasStream: true });
      
      };
      addStream();
      setPeerObj((state) => ({
        ...state,
        new: false,
      }));
    }
  }, [peerObj.new]);
  //add a new local stream to the pear
  // useEffect(() => {
  //   const stream = localStreamObject.stream;
  //   if (stream) {
  
  //     peerObj.peer.addStream(stream);
  //   }
  //   setLocalStream((state) => ({ ...state, new: false }));
  // }, [localStreamObject.hasStream]);
  //add a new remote stream to the pear
  // useEffect(() => {
  //   const stream = remoteStreamObject.stream;
  //   if (stream) {
  //     peerObj.peer.addStream(stream);
  //   }
  //   setRemoteStream((state) => ({ ...state, new: false }));
  // }, [remoteStreamObject.hasStream]);

  return {
    call,
    leaveCall,
    cancelCall,
    peer:peerObj.peer,
    
    hasLocalStream: localStreamObject.hasStream,
    setLocalStream,
    hasRemoteStream: remoteStreamObject.hasStream,
    setRemoteStream,
    setVideoRemote,
    setVideoLocal,
    localStream: localStreamObject.stream,
    remoteStream: remoteStreamObject.stream,
  };
};

export default useCall;
