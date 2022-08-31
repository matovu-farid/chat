import React, { useEffect, useRef, useState } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import {
  addAudio,
  addVideo,
  BooleanSetter,
  removeAudio,
  removeVideo,
  screenShare,
  startLocalVideo,
  stopLocalVideo,
  stopScreenShare,
  TrackEditor,
} from "../utils/stream";
import { AiFillAudio } from "react-icons/ai";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import Peer from "simple-peer";
import {
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import Modal from "./Modal";
interface Props {
  handleLeaveCall: () => void;
  peer: Peer.Instance | null;
  hasRemoteStream: boolean;
  hasLocalStream: boolean;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

const VideoStreamer = ({
  handleLeaveCall,
  peer,
  hasLocalStream,
  hasRemoteStream,
  localStream,
  remoteStream,
}: Props) => {
  const [hasAudioOn, setHasAudio] = useState(true);
  const [hasVideoOn, setHasVideo] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleRemove = (remover: TrackEditor, setter: BooleanSetter) => {
    if (peer) {
      remover(peer, () => {
        setter(false);
      });
    } else {
      stopLocalVideo(localStream, () => {
        setHasVideo(false);
      });
    }
  };
  const handleAdd = (adder: TrackEditor, setter: BooleanSetter) => {
    if (peer) {
      adder(peer, () => {
        setter(true);
      });
    } else {
      startLocalVideo(localStream, () => {
        setHasVideo(true);
      });
    }
  };
  const handleScreenShare = () => {
    if (peer)
      screenShare(peer, () => {
        setIsScreenSharing(true);
      });
  };
  const handleStopScreenShare = () => {
    stopScreenShare(peer);
    setIsScreenSharing(false);
  };


  useEffect(() => {
    const videoElm = videoRef.current;
    
    if (videoElm && remoteStream) {
        videoElm.srcObject = remoteStream;
        setHasVideo(true)
        return
    }
    if (videoElm && localStream) {
      videoElm.srcObject = localStream;
      setHasVideo(true)
    }
  }, [hasVideoOn,hasLocalStream,hasRemoteStream]);

  return (
    <Modal>
      <div className="fixed bg-gray-900 top-0  h-screen w-full">
        <div className="text-lg   w-full max-w-3xl mx-auto my-auto">
          <Paper className="mx-auto  z-10">
            <video
              className="w-full"
              height={800}
              playsInline
              autoPlay
              ref={videoRef}
            ></video>
            <div className="w-full bg-transparent opacity-0 transition-opacity top-0 hover:opacity-100  h-full left-0  absolute  flex gap-2 items-end justify-center">
              <button
                onClick={() => handleLeaveCall()}
                className="rounded-[50%] p-3 bg-red-600 "
              >
                <GrClose className="cusrsor-pointer " />
              </button>

              <>
                {hasRemoteStream &&
                  (hasAudioOn ? (
                    <button
                      onClick={() => handleRemove(removeAudio, setHasAudio)}
                      className="rounded-[50%] p-3  bg-green-500"
                    >
                      <AiFillAudio className="cursor-pointer " />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdd(addAudio, setHasAudio)}
                      className="rounded-[50%] p-3 bg-red-600"
                    >
                      <BsFillMicMuteFill className="cursor-pointer " />
                    </button>
                  ))}
                {hasVideoOn ? (
                  <button
                    onClick={() => handleRemove(removeVideo, setHasVideo)}
                    className="rounded-[50%] p-3 bg-green-500"
                  >
                    <BsCameraVideoFill className="cursor-pointer " />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAdd(addVideo, setHasVideo)}
                    className="rounded-[50%] p-3 bg-red-600  "
                  >
                    <BsFillCameraVideoOffFill className="cursor-pointer " />
                  </button>
                )}
                {isScreenSharing ? (
                  <button
                    onClick={() => handleStopScreenShare()}
                    className="rounded-[50%] p-3 bg-red-600  "
                  >
                    <MdStopScreenShare className="cursor-pointer " />
                  </button>
                ) : (
                  <button
                    onClick={() => handleScreenShare()}
                    className="rounded-[50%] p-3 bg-green-500 "
                  >
                    <MdScreenShare className="cursor-pointer " />
                  </button>
                )}
              </>
            </div>
          </Paper>
        </div>
      </div>
    </Modal>
  );
};

export default VideoStreamer;
