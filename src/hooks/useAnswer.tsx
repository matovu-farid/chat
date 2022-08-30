import React from "react";
import create from "zustand";
import { getLocalStream } from "../utils/stream";
import SignalData, { Cleanup } from "../Interfaces/SignalData";
import { createPeer } from "../utils/peer";
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import { devtools, redux } from "zustand/middleware";

interface AnswerState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  signalData: SignalData | null;
  addLocalStream: () => Promise<void>;
  addRemoteStream: (stream: MediaStream) => void;
  addSignalData: (signalData: SignalData) => void;
  answer: (signalData:SignalData) => void;
  peer: Peer.Instance | null;
  hasLocalStream: () => boolean;
  hasRemoteStream: () => boolean;
  leave: (cleanup?: Cleanup) => void;
  cancel: (cleanup?: Cleanup) => void;
}

const useAnswer = create<AnswerState>()(
  (devtools((set, get) => ({
    localStream: null,
    remoteStream: null,
    signalData: null,
    peer: null,
    hasLocalStream: () => get().localStream !== null,
    hasRemoteStream: () => get().remoteStream !== null,
    addLocalStream: async () => {
      set({ localStream: await getLocalStream() });
    },
    addRemoteStream: (stream: MediaStream) => {
      set({ remoteStream: stream });
    },
    addSignalData: (signalData: SignalData) => {
      set({ signalData });
      get().answer(signalData)
    },
    answer: (signalData:SignalData) => {
      const { localStream: stream } = get();
      console.log("stream", stream, "signaldata", signalData);
      if (signalData) {
        const peer = stream?createPeer({ stream }):createPeer({});
        peer.on("signal", (data) => {
          if (peer.connected) return;
          socket.emit("answerCall", {
            signal: data,
            to: signalData.from,
            from: signalData.to,
          });
        });
        peer.on("connect", () => {
          console.log(".....connected");
        });
        peer.on("stream", (stream) => {
          set({ remoteStream: stream });
        });
        peer.on("close", () => {
          get().leave();
        });
        peer.signal(signalData.signal);
        set({ peer });
      }
    },
    cancel: (cleanup?: Cleanup) => {
      const { signalData } = get();
      if (signalData) socket.emit("callRejected", signalData.from);
      if (cleanup) cleanup();
    },
    leave: (cleanup?: Cleanup) => {
      const { peer, remoteStream, localStream } = get();
      if (peer) peer.destroy();

      remoteStream?.getTracks().forEach((track) => {
        track.stop();
      });
      localStream?.getTracks().forEach((track) => {
        track.stop();
      });
      set({
        localStream: null,
        remoteStream: null,
        peer: null,
        signalData: null,
      });

      if (cleanup) cleanup();
    },
  })))
);

export default useAnswer;
