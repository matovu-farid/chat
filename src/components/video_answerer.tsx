import React, { useContext, useEffect, useRef, useState } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import { useRouter } from "next/router";
import { AnwerContext } from "../contexts/answer_ctx";
import {
  addAudio,
  addVideo,
  BooleanSetter,
  getLocalStream,
  removeAudio,
  removeVideo,
  TrackAdder,
  TrackChecker,
  
  TrackRemover,
} from "../utils/stream";
import { AiFillAudio } from "react-icons/ai";
import {
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";

const VideoAnswerer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const {
    leaveCall,
    hasLocalStream,
    localStream,
    answer,
    peerRef,
    localStreamRef,
  } = useContext(AnwerContext);


  const handleLeaveCall = () => {
    leaveCall();
  };
  useEffect(() => {
    if (hasLocalStream()) {
      answer();
      const peer = peerRef.current;
      if (peer) {
        peer.on("stream", (stream) => {
          const videoElm = videoRef.current;
          if (videoElm) videoElm.srcObject = stream;
          console.log("remoteStream", stream);
        });
        peer.on("close", () => {
          handleLeaveCall();
        });
      }
    }
  }, [hasLocalStream()]);
  

  useEffect(() => {
    getLocalStream((stream) => {
      localStreamRef.current = stream;
      setLocal(stream);
    });
  }, []);
  const hasLocal = hasLocalStream();
  const [local, setLocal] = useState<MediaStream | null>();

  useEffect(() => {
    const videoElm = videoRef.current;
   if (videoElm) videoElm.srcObject = localStream();
  }, [hasLocal]);
  const getPeer = () => peerRef.current;

  const [hasAudioOn,setHasAudio] = useState(true)
  const [hasVideoOn,setHasVideo] = useState(true)
  const handleRemove=(remover:TrackRemover,setter:BooleanSetter)=>{
    const peer = getPeer()
    if(peer){
      remover(peer,()=>{
        setter(false)
      })
    }
  }
  const handleAdd=(adder:TrackAdder,setter:BooleanSetter)=>{
    const peer = getPeer()
    if(peer){
      adder(peer,()=>{
        setter(true)
      })
    }
  }

  return hasLocalStream() ? (
    <div className="text-lg fixed   top-[20%]">
      <Paper className="mx-auto ">
        <video className="w-full"  height={800} playsInline autoPlay ref={videoRef}></video>
        <div className="w-full left-0  bottom-3 absolute  flex gap-2 justify-center">
          <button
            onClick={() => handleLeaveCall()}
            className="rounded-[50%] p-3 bg-red-600 "
          >
            <GrClose className="cusrsor-pointer " />
          </button>
          {local && (
            <>
              {hasAudioOn? (
                <button
                  onClick={() => handleRemove(removeAudio,setHasAudio)}
                  className="rounded-[50%] p-3  bg-green-500"
                >
                  <AiFillAudio  className="cursor-pointer " />
                </button>
              ) : (
                <button
                  onClick={() => handleAdd(addAudio,setHasAudio)}
                  className="rounded-[50%] p-3 bg-red-600"
                >
                  <BsFillMicMuteFill className="cursor-pointer " />
                </button>
              )}
              {hasVideoOn? (
                <button
                  onClick={() => handleRemove(removeVideo,setHasVideo)}
                  className="rounded-[50%] p-3 bg-green-500"
                >
                  <BsCameraVideoFill className="cursor-pointer " />
                </button>
              ) : (
                <button
                  onClick={() => handleAdd(addVideo,setHasVideo)}
                  className="rounded-[50%] p-3 bg-red-600  "
                >
                  <BsFillCameraVideoOffFill  className="cursor-pointer " />
                </button>
              )}
            </>
          )}
        </div>
      </Paper>
    </div>
  ) : null;
};

export default VideoAnswerer;
