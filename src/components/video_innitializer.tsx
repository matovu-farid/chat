import React, { useContext, useEffect, useRef, useState } from "react";
import VideoStreamer from "./Video";
import usePeer from "../hooks/usePeer";
import { useRouter } from "next/router";

const VideoComponent = () => {
  return <VideoStreamer />;
};

export default VideoComponent;
