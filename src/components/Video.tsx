import React, { useState } from "react";

import { GrClose } from "react-icons/gr";
import Paper from "./Paper";
import {
  addAudio,
  addVideo,
  BooleanSetter,
  removeAudio,
  removeVideo,
  TrackAdder,
  TrackRemover,
} from "../utils/stream";
import { AiFillAudio } from "react-icons/ai";
import Peer from "simple-peer";
import {
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
interface Props {
  handleLeaveCall: () => void;
  peer: Peer.Instance|null;
  videoRef: React.LegacyRef<HTMLVideoElement> | undefined;
}
const VideoStreamer = ({ handleLeaveCall, peer, videoRef }: Props) => {
  const [hasAudioOn, setHasAudio] = useState(true);
  const [hasVideoOn, setHasVideo] = useState(true);
  const handleRemove = (remover: TrackRemover, setter: BooleanSetter) => {
    if (peer) {
      remover(peer, () => {
        setter(false);
      });
    }
  };
  const handleAdd = (adder: TrackAdder, setter: BooleanSetter) => {
    if (peer) {
      adder(peer, () => {
        setter(true);
      });
    }
  };
  return (
    <div className="text-lg fixed   top-[20%]">
      <Paper className="mx-auto ">
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
            {hasAudioOn ? (
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
            )}
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
          </>
        </div>
      </Paper>
    </div>
  );
};

export default VideoStreamer;
