import React from "react";
import create from "zustand";
import { getLocalStream } from "../utils/stream";
import SignalData, { Cleanup } from "../Interfaces/SignalData";
import { createPeer } from "../utils/peer";
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import { devtools, redux } from "zustand/middleware";

interface PeerState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  signalData: SignalData | null;
  addLocalStream: () => Promise<MediaStream | null>;
  addRemoteStream: (stream: MediaStream) => void;
  addSignalData: (signalData: SignalData) => Promise<void>;
  answer: (signalData: SignalData, localStream: MediaStream) => void;
  peer: Peer.Instance | null;
  hasLocalStream: () => boolean;
  hasRemoteStream: () => boolean;
  leave: (cleanup?: Cleanup) => void;
  cancel: (cleanup?: Cleanup) => void;
  call: (callerId: string, calledId: string) => Promise<void>;
}

const usePeer = create<PeerState>()(
  devtools((set, get) => ({
    localStream: null,
    remoteStream: null,
    signalData: null,
    peer: null,
    hasLocalStream: () => get().localStream !== null,
    hasRemoteStream: () => get().remoteStream !== null,
    addLocalStream: async () => {
      if (get().hasLocalStream()) return get().localStream;
      const stream = await getLocalStream();
      set({ localStream: stream });
      return stream;
    },
    addRemoteStream: (stream: MediaStream) => {
      set({ remoteStream: stream });
    },
    addSignalData: async (signalData: SignalData) => {
      set({ signalData });
      const stream = await get().addLocalStream();

      stream && get().answer(signalData, stream);
    },
    answer: (signalData: SignalData, stream: MediaStream) => {
      console.log("stream", stream, "signaldata", signalData);
      if (signalData) {
        const peer = stream ? createPeer({ stream }) : createPeer({});
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
    call: async (callerId: string, calledId: string) => {
      const stream = await get().addLocalStream();
      const peer = stream
        ? createPeer({ stream, innititor: true })
        : createPeer({ innititor: true });
      set({ peer });

      peer.on("signal", (data) => {
        socket.emit("callUser", { signal: data, from: callerId, to: calledId });
      });
      peer.on("stream", (stream) => {
        console.log("stream got", stream);
        set({ remoteStream: stream });
      });
      peer.on("connect", () => {
        console.log("-----------------------------");
        console.log("Connected");
        console.log("-----------------------------");
      });
      peer.on("close", () => {
        console.log("closed");
        get().leave();

        socket.off("answered");
      });

      socket.on("answered", (data) => {
        console.log("answered again");
        peer.signal(data.signal);
      });
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
  }))
);

export default usePeer;
