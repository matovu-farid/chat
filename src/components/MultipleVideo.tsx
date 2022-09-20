import React, { useEffect, useRef } from "react";
import usePeer from "../hooks/usePeer";

const MultipleVideo = () => {
  const { remoteStreams, localStream } = usePeer();
  const streams = [...remoteStreams, localStream];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {streams.map((stream) => (
        <IndividalVideo stream={stream} />
      ))}
    </div>
  );
};
interface VideoProps {
  stream: MediaStream | null;
}
const IndividalVideo = ({ stream }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      video.srcObject = stream;
    }
  }, [stream]);
  return (
    <video
      className="w-full h-full"
      playsInline
      autoPlay
      ref={videoRef}
    ></video>
  );
};

export default MultipleVideo;
