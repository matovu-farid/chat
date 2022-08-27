/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
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
  answer: (stream: MediaStream, signalData: SignalData) => void;
  localStream: MediaStream | undefined;
  remoteStream: MediaStream | undefined;
  signalData: SignalData | null;
  hasLocalStream: boolean;
  hasRemoteStream: boolean;
  setSignalData: React.Dispatch<React.SetStateAction<SignalData | null>>;
  cancelCall: (cleanup?: () => void) => void;
  setLocalStream: React.Dispatch<React.SetStateAction<StreamObject>>;
}
let stream: MediaStream;

 export let AnwerContext: React.Context<IAnswerContext>;


const AnswerProvider = ({ children }: PropsWithChildren) => {
  const {
    localStream,
    cancelCall,
    answer,
    setSignalData,
    signalData,
    leaveCall,
    setLocalStream,
    hasLocalStream,
    hasRemoteStream,
    remoteStream,
  } = useAnswerCall();

  const [answerContext] = useState<IAnswerContext>({
    leaveCall,
    answer,
    localStream,
    remoteStream,
    signalData,
    hasLocalStream,
    hasRemoteStream,
    setSignalData,
    cancelCall,
    setLocalStream,
  });
  const AnwerCtx: React.Context<IAnswerContext> = createContext(answerContext);

  return (
    <>
      {answerContext ? (
        <AnwerCtx.Provider value={answerContext}>{children}</AnwerCtx.Provider>
      ) : null}
    </>
  );
};

export default AnswerProvider;
