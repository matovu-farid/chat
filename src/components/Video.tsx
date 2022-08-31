import React, { useEffect, useRef, useState } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import { AiFillAudio } from "react-icons/ai";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import Peer from "simple-peer";
import {
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import Modal from "./Modal";
import useVideo from "../hooks/useVideo";
import { useRouter } from "next/router";
import usePeer from "../hooks/usePeer";

const VideoStreamer = () => {
  const bigVideoRef = useRef<HTMLVideoElement>(null);
  const smallVideoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const {
    leave,
    hasLocalStream,
    localStream,
    peer,
    remoteStream,
    hasRemoteStream,
    addLocalStream,
  } = usePeer();
  const handleLeave = () => {
    leave();
    router.push("/");
  };
  const {
    hasAudio,
    hasVideo,
    isScreenSharing,
    handleAddVideo,
    handleRemoveAudio,
    handleScreenShare,
    handleRemoveVideo,
    handleAddAudio,
    handleStopScreenShare,
    setHasAudio,
    setHasVideo,
  } = useVideo();
  useEffect(() => {
    if (remoteStream) {
      const smallVideo = smallVideoRef.current;
      const bigVideo = bigVideoRef.current;
      if (bigVideo && remoteStream) {
        bigVideo.srcObject = remoteStream;
        bigVideo.muted = false;
      }
      if (smallVideo && localStream) smallVideo.srcObject = localStream;
      setHasVideo(true);
      setHasAudio(true);
    } else if (hasLocalStream) {
      const videoElm = bigVideoRef.current;
      if (videoElm && localStream) {
        videoElm.srcObject = localStream;
        videoElm.muted = true;
      }
      setHasVideo(true);
    } else {
      setHasVideo(false);
      addLocalStream();
    }
  }, [hasRemoteStream, hasLocalStream, hasVideo, hasAudio]);

  return hasLocalStream ? (
    <Modal>
      <div className="fixed bg-gray-900 top-0  h-screen w-full">
        <div className="text-lg   w-full max-w-3xl mx-auto my-auto">
          <Paper className="mx-auto my-auto z-10">
            <div className="relative">
              <video
                className="w-full"
                height={800}
                playsInline
                autoPlay
                ref={bigVideoRef}
              ></video>
              {hasRemoteStream && (
                <Paper className="absolute right-0 top-0 z-20 rounded-lg overflow-hidden">
                  <video
                    height={200}
                    width={200}
                    playsInline
                    autoPlay
                    muted={true}
                    ref={smallVideoRef}
                  ></video>
                </Paper>
              )}
              <div className="w-full bg-transparent opacity-0 transition-opacity top-0 hover:opacity-100  h-full left-0  absolute  flex gap-2 items-end justify-center">
                <button
                  onClick={() => handleLeave()}
                  className="rounded-[50%] p-3 bg-red-600 "
                >
                  <GrClose className="cusrsor-pointer " />
                </button>

                <>
                  {hasRemoteStream &&
                    (hasAudio ? (
                      <button
                        onClick={() => handleRemoveAudio(peer, localStream)}
                        className="rounded-[50%] p-3  bg-green-500"
                      >
                        <AiFillAudio className="cursor-pointer " />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddAudio(peer, localStream)}
                        className="rounded-[50%] p-3 bg-red-600"
                      >
                        <BsFillMicMuteFill className="cursor-pointer " />
                      </button>
                    ))}
                  {hasVideo ? (
                    <button
                      onClick={() => handleRemoveVideo(peer, localStream)}
                      className="rounded-[50%] p-3 bg-green-500"
                    >
                      <BsCameraVideoFill className="cursor-pointer " />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddVideo(peer, localStream)}
                      className="rounded-[50%] p-3 bg-red-600  "
                    >
                      <BsFillCameraVideoOffFill className="cursor-pointer " />
                    </button>
                  )}
                  {isScreenSharing ? (
                    <button
                      onClick={() => handleStopScreenShare(peer)}
                      className="rounded-[50%] p-3 bg-red-600  "
                    >
                      <MdStopScreenShare className="cursor-pointer " />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleScreenShare(peer)}
                      className="rounded-[50%] p-3 bg-green-500 "
                    >
                      <MdScreenShare className="cursor-pointer " />
                    </button>
                  )}
                </>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default VideoStreamer;
