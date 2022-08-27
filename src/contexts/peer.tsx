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
import SignalData from "../Interfaces/SignalData";
import CallNotification from "../components/CallNotification";
import { Store } from "react-notifications-component";
import { useRouter } from "next/router";

interface IPeerContext {
  leaveCall: (cleanup?: () => void) => void;
  answerCall: (stream: MediaStream) => void;
  call: (callerId: string, calledId: string) => Promise<void>;
  onStream: (callback: (sream: MediaStream) => void) => void;
  addLocalStream: () => void;
  getLocalStream: () => MediaStream | null;
  getRemoteStream: () => MediaStream | null;
  cancelCall: (cleanup?: () => void) => void;
  setVideoToLocal: (videoElm: HTMLVideoElement) => void;
}
let stream: MediaStream;

const PeerContext = createContext<IPeerContext>({
  leaveCall: () => {},
  answerCall: () => {},
  call: async () => {},
  addLocalStream: () => {},
  getLocalStream: () => stream,
  getRemoteStream: () => stream,
  cancelCall: () => {},
  setVideoToLocal: () => {},
  onStream: () => {},
});
export const usePeer = () => {
  return useContext(PeerContext);
};
const PeerProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  let signalData: SignalData | null = null;
  let peer: Peer.Instance | null = null;
  let remoteStream: MediaStream | null = null;
  let localStream: MediaStream | null = null;

  useEffect(() => {
    socket.on("called", (data: SignalData) => {
      signalData = data;
      Store.addNotification({
        title: "Call coming in",
        message: <CallNotification />,
        container: "top-right",
        type: "success",
      });
    });
    socket.on("callRejected", () => {
      leaveCall();
    });
  }, []);
  const cancelCall = (cleanup?: () => void) => {
    peer = null;

    if (signalData) socket.emit("callRejected", signalData.from);
    if (cleanup) cleanup();
  };
  const setVideoToLocal = async (videoElm: HTMLVideoElement) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream = stream;
    videoElm.srcObject = stream;
  };

  const leaveCall = (cleanup?: () => void) => {
    if (peer) peer.destroy();

    localStream?.getTracks().forEach((track) => {
      track.stop();
    });

    remoteStream?.getTracks().forEach((track) => {
      track.stop();
    });
    localStream = null;
    remoteStream = null;
    if (signalData) signalData = null;

    if (cleanup) cleanup();
  };
  const onStream = (callBack: (stream: MediaStream) => void) => {
    if (peer) peer.on("stream", callBack);
  };
  const call = async (callerId: string, calledId: string) => {
    const stream =
      localStream ??
      (await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      }));
    const newPeer = new Peer({
      stream: stream,
      initiator: true,
      trickle: false,
    });
    newPeer.on("signal", (data) => {
      socket.emit("callUser", { signal: data, from: callerId, to: calledId });
    });
    newPeer.on("stream", (stream) => {
      remoteStream = stream;
    });
    newPeer.on("connect", () => {
      console.log("-----------------------------");
      console.log("Connected");
      console.log("-----------------------------");
    });
    newPeer.on("close", () => {
      console.log("closed");
      leaveCall();
    });

    socket.on("answered", (data) => {
      newPeer.signal(data.signal);
    });
    peer = newPeer;
  };
  const addLocalStream = () => {
    if (localStream && peer) peer.addStream(localStream);
  };
  const answerCall = (stream: MediaStream) => {
    console.log(stream);
    console.log("signal data", signalData);

    const newPeer = new Peer({
      stream: stream,
      initiator: false,
      trickle: false,
    });

    newPeer.on("signal", (data) => {
      console.log("signal hit.......................");
      console.log(data);
      if (signalData) {
        socket.emit("answerCall", {
          signal: data,
          to: signalData.from,
          from: signalData.to,
        });
      }
    });
    newPeer.on("connect", () => {
      console.log("-----------------------------");
      console.log("Connected");
      console.log("-----------------------------");
    });
    newPeer.on("close", () => {
      leaveCall();
    });

    newPeer.on("stream", (stream) => {
      remoteStream = stream;
    });
    if (signalData) newPeer.signal(signalData.signal);
    peer = newPeer;
    router.push("/chat/video");
    localStream = stream;
  };

  const [peerContext] = useState<IPeerContext>({
    leaveCall,
    answerCall,
    call,
    onStream,
    cancelCall,
    addLocalStream,
    getLocalStream: () => localStream,
    getRemoteStream: () => remoteStream,
    setVideoToLocal,
  });
  return (
    <>
      {peerContext ? (
        <PeerContext.Provider value={peerContext}>
          {children}
        </PeerContext.Provider>
      ) : null}
    </>
  );
};

export default PeerProvider;
