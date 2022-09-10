import create from "zustand";
import { getLocalStream } from "../utils/stream";
import SignalData, { CallInfo, Cleanup } from "../Interfaces/SignalData";
import { createPeer } from "../utils/peer";
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import { devtools } from "zustand/middleware";
import { NextRouter, useRouter } from "next/router";
import { Store } from "react-notifications-component";
import { router } from "@trpc/server";

interface PeerState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  signalData: SignalData | null;
  callInfo: CallInfo | null;
  isCalling: boolean;
  addLocalStream: () => Promise<MediaStream | null>;
  addRemoteStream: (stream: MediaStream) => void;
  addSignalData: (signalData: SignalData) => Promise<void>;
  answer: (signalData: SignalData, localStream: MediaStream) => void;
  peer: Peer.Instance | null;
  hasLocalStream: boolean;
  connected: boolean;
  hasRemoteStream: boolean;
  leave: ( cleanup?: Cleanup) => void;
  cancelCall: (signalData: SignalData) => void;
  call: (callInfo: CallInfo) => void;
  addCallInfo: (callinfo: CallInfo) => Promise<void>;
}

const usePeer = create<PeerState>()(
  devtools((set, get) => {
   
    const peer =  (<PeerState>{
      connected: false,
      isCalling: false,
      localStream: null,
      remoteStream: null,
      signalData: null,
      peer: null,
      callInfo: null,
      hasLocalStream: false,
      hasRemoteStream: false,

      addCallInfo: async (callInfo: CallInfo) => {
        set({ callInfo });
        get().call(callInfo);
      },
      addLocalStream: async () => {
        if (get().hasLocalStream)
          return get().localStream;
        const stream = await getLocalStream();
        set({ localStream: stream, hasLocalStream: true });
        return stream;
      },
      addRemoteStream: (stream: MediaStream) => {
        set({ remoteStream: stream, hasRemoteStream: true });
      },
      addSignalData: async (signalData: SignalData) => {
        set({ signalData });
        const stream = await get().addLocalStream();
        stream && get().answer(signalData, stream);
      },
      answer: (signalData: SignalData, stream: MediaStream) => {
        set({ isCalling: false });
        if (signalData) {
          const peer = stream ? createPeer({ stream }) : createPeer({});
          peer.on("signal", (data) => {
            if (peer.connected)
              return;
            socket.emit("answerCall", {
              signal: data,
              to: signalData.from,
              from: signalData.to,
            });
          });
          peer.on("stream", (stream) => {
            set({ remoteStream: stream, hasRemoteStream: true });
          });

          peer.on("close", () => {
            get().leave();
          });
          peer.signal(signalData.signal);
          set({ peer });
          peer.on("connect", () => {
            set({ connected: true });
          });
        }
      },
      call: async ({ callerId, calledId, callerName }: CallInfo) => {
        set({ isCalling: true });
        const stream = await get().addLocalStream();
        const peer = stream
          ? createPeer({ stream, innititor: true })
          : createPeer({ innititor: true });

        peer.on("signal", (data) => {
          socket.emit("callUser", {
            signal: data,
            from: callerId,
            to: calledId,
            callerName,
          });
        });
        peer.on("stream", (stream) => {
          set({ remoteStream: stream, hasRemoteStream: true });
        });
        peer.on("close", () => {
          get().leave();
          set({ callInfo: null });

          socket.off("answered");
        });
        peer.on("connect", () => {
          set({ connected: true });
        });

        socket.on("answered", (data) => {
          peer.signal(data.signal);
          set({ signalData: data });
        });
        socket.on("callRejected", () => {
          console.log("Rejected.......");

          set({ isCalling: false });
          get().leave(() => {
            Store.addNotification({
              title: "The call was rejected",
              container: "top-right",
              type: "warning",
            });
          });
        });

        set({ peer });
      },
      cancelCall: (signalData: SignalData, cleanup?: Cleanup) => {
        
        socket.emit("callRejected", signalData.from);
        if (cleanup)
          cleanup();
        set({
          localStream: null,
          remoteStream: null,
          peer: null,
          signalData: null,
          hasRemoteStream: false,
          hasLocalStream: false,
          isCalling: false,
        });
      },
      leave: (cleanup?: Cleanup) => {
        const { peer, remoteStream, localStream } = get();
        if (peer)
          peer.destroy();

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
          hasRemoteStream: false,
          hasLocalStream: false,
          isCalling: false,
          connected: false,
        });

        if (cleanup)
          cleanup();
      },
    });
    return peer
  })
);

export default usePeer;
