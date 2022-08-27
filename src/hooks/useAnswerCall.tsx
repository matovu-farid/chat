/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import SignalData, { PeerObject, StreamObject } from "../Interfaces/SignalData";
import { useRouter } from "next/router";
import { Sign } from "crypto";

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
  const setVideoLocal = (video: HTMLVideoElement) => {
    const stream = localStreamObject.stream;
    if (stream) video.srcObject = stream;
  };
  const setVideoRemote = (video: HTMLVideoElement) => {
    const stream = remoteStreamObject.stream;
    if (stream) video.srcObject = stream;
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
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      if (signalData) {
        socket.emit("answerCall", {
          signal: data,
          to: signalData.from,
          from: signalData.to,
        });
      }
    });
    peer.on("stream", (stream) => {
      setRemoteStream({ stream, hasStream: true });
    });
    peer.on("connect", () => {
      console.log("-----------------------------");
      console.log("Connected");
      console.log("-----------------------------");
    });
    peer.on("close", () => {
      leaveCall();
    });
    peer.signal(signalData.signal);
    setPeerObj({
      peer,
      new: true,
    });
    // router.push("/chat/video");
  };
  useEffect(() => {
    const addStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream({ stream, hasStream: true });
    };
    addStream();
  }, []);

  // add the local stream when there is a new peer

  const hasLocalStream = localStreamObject.hasStream;
  const hasRemoteStream = remoteStreamObject.hasStream;
  //add a new local stream to the pear
  useEffect(() => {
    const stream = localStreamObject.stream;
    if (stream) {
      peerObj.peer.addStream(stream);
    }
    setLocalStream((state) => ({ ...state, new: false }));
  }, [hasLocalStream]);
  //add a new remote stream to the pear
  useEffect(() => {
    const stream = remoteStreamObject.stream;
    if (stream) {
      peerObj.peer.addStream(stream);
    }
    setRemoteStream((state) => ({ ...state, new: false }));
  }, [hasRemoteStream]);

  return {
    answer,
    signalData,
    setSignalData,
    leaveCall,
    cancelCall,
    hasLocalStream,
    hasRemoteStream,
    setVideoLocal,
    setVideoRemote,
    setLocalStream,
    localStream: localStreamObject.stream,
    remoteStream: remoteStreamObject.stream,
    
  };
};

export default useAnswerCall;
