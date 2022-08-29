/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import socket from "../utils/socket_init";
import Peer from "simple-peer";
import SignalData, { StreamObject } from "../Interfaces/SignalData";
import CallNotification from "../components/CallNotification";
import { Store } from "react-notifications-component";
import { useRouter } from "next/router";
import useAnswerCall from "../hooks/useAnswerCall";

interface IAnswerContext {
  leaveCall: (cleanup?: () => void) => void;
  answer: () => void;
  localStream: () => MediaStream | null;
  remoteStream: () => MediaStream | null;
  signalDataRef: React.MutableRefObject<SignalData | null>;
  hasLocalStream: () => boolean;
  hasRemoteStream: () => boolean;
  setSignalData: (data: SignalData) => void;
  cancelCall: (cleanup?: () => void) => void;
  peerRef: React.MutableRefObject<Peer.Instance | null>;
  remoteStreamRef: React.MutableRefObject<MediaStream | null>;
  localStreamRef: React.MutableRefObject<MediaStream | null>;
}

export let AnwerContext: React.Context<IAnswerContext>;

const AnswerProvider = ({ children }: PropsWithChildren) => {
  const signalDataRef = useRef<SignalData | null>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const hasLocalStream = () => localStreamRef.current !== null;
  const hasRemoteStream = () => remoteStreamRef.current !== null;

  const {
    cancelCall: AnswerCancelCall,

    leaveCall: answerLeaveCall,
    createPeer,
  } = useAnswerCall();
  const leaveFunction=(cleanup?: () => void)=>{
    peerRef.current?.destroy()
    answerLeaveCall(
      remoteStreamRef.current,
      localStreamRef.current,
      peerRef.current,
      cleanup
    );

    localStreamRef.current = null;
    remoteStreamRef.current = null;
  }

  const innitialAnswerContext = {
    localStreamRef,
    remoteStreamRef,
    peerRef,
    leaveCall(cleanup?: () => void) {
      leaveFunction(cleanup)
    },

    localStream: () => localStreamRef.current,
    setSignalData(data: SignalData) {
      signalDataRef.current = data;
    },
    remoteStream: () => remoteStreamRef.current,
    signalDataRef,
    hasLocalStream,
    hasRemoteStream,
    cancelCall(cleanup?: () => void) {
      AnswerCancelCall(answerContext.signalDataRef.current, cleanup);
    },
    answer: () => {
      const stream = localStreamRef.current;
      console.log("local-stream", stream);
      console.log("answering...........");
      const signalData = signalDataRef.current;
      if (stream && signalData) {
        const peer = createPeer(stream);
        peer.on("signal", (data) => {
          console.log('signalled again')
          if(!peer.connected)
          socket.emit("answerCall", {
            signal: data,
            to: signalData.from,
            from: signalData.to,
          });
        });

        peer.on("stream", (stream) => {
          remoteStreamRef.current = stream;
        });
       
        
        peer.on("connect", () => {
          console.log("-----------------------------");
          console.log("Connected");
          console.log("-----------------------------");
          // answered.current = true
        });
        console.log('connected',peer.connected)
       
        if(!peer.connected) peer.signal(signalData.signal);
        peerRef.current = peer;
      }
    },
  };

  const [answerContext] = useState<IAnswerContext>(innitialAnswerContext);

  const AnwerCtx: React.Context<IAnswerContext> = createContext(answerContext);
  AnwerContext = AnwerCtx;

  return (
    <>
      {answerContext ? (
        <AnwerCtx.Provider value={answerContext}>{children}</AnwerCtx.Provider>
      ) : null}
    </>
  );
};

export default AnswerProvider;
