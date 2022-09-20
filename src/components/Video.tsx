import React, { useEffect, useRef } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import { AiFillAudio } from "react-icons/ai";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
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
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const {
    leave,
    hasLocalStream,
    localStream,
    peers: peer,
    remoteStreams,
    hasRemoteStream,
    addLocalStream,
  } = usePeer();
  const handleLeave = () => {
    leave(() => router.push("/"));
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
  } = useVideo();

  const updateVideo = () => {
    const localVideo = localVideoRef.current;
    if (localVideo && localStream) {
      localVideo.srcObject = localStream;
      localVideo.volume = 0;
    }

    const bigVideo = bigVideoRef.current;
    const remoteStream = remoteStreams[0];
    if (bigVideo && remoteStream) {
      bigVideo.srcObject = remoteStream;
    }

    const smallVideo = smallVideoRef.current;
    if (smallVideo && localStream) {
      smallVideo.srcObject = localStream;
      smallVideo.volume = 0;
    }
  };
  useEffect(() => {
    updateVideo();
  });

  useEffect(() => {
    if (!localStream) addLocalStream();
    const localVideo = localVideoRef.current;
    if (localVideo && localStream) localVideo.srcObject = localStream;
  }, []);

  return hasLocalStream ? (
    <Modal>
      <div className="fixed bg-gray-900 top-0  h-screen w-full flex flex-col justify-center items-center">
        <div className="text-lg   w-full max-w-[900px]  flex flex-col justify-center items-center">
          <Paper className=" z-10">
            <div className="relative">
              {remoteStreams.length === 1 ? (
                <>
                  <video
                    className="w-[800px]"
                    playsInline
                    autoPlay
                    ref={bigVideoRef}
                  ></video>

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
                </>
              ) : (
                <video
                  className="w-[800px]"
                  playsInline
                  autoPlay
                  ref={localVideoRef}
                  muted={true}
                ></video>
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
                  {hasRemoteStream ? (
                    <>
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
                  ) : null}
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
