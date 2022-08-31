import React from "react";
import { devtools } from "zustand/middleware";
import create from "zustand";
import Peer from "simple-peer";
import {
  addAudio,
  addVideo,
  removeVideo,
  screenShare,
  startLocalAudio,
  startLocalVideo,
  stopLocalAudio,
  stopLocalVideo,
  stopScreenShare,
  TrackEditor,
} from "../utils/stream";

interface VideoState {
  hasVideo: boolean;
  hasAudio: boolean;
  isScreenSharing: boolean;
  init: (hasAudio: true, hasVideo: true) => void;
  handleAddVideo: (
    peer: Peer.Instance | null,
    localStream: MediaStream | null
  ) => void;
  handleRemoveVideo: (
    peer: Peer.Instance | null,
    localStream: MediaStream | null
  ) => void;
  handleAddAudio: (
    peer: Peer.Instance | null,
    localStream: MediaStream | null
  ) => void;
  handleRemoveAudio: (
    peer: Peer.Instance | null,
    localStream: MediaStream | null
  ) => void;
  handleScreenShare: (peer: Peer.Instance | null) => void;
  handleStopScreenShare: (peer: Peer.Instance | null) => void;
  setHasVideo:(hasVideo:boolean)=>void;
  setHasAudio:(hasAudio:boolean)=>void;
}

const useVideo = create<VideoState>()(
  devtools((set) => ({
    hasVideo: true,
    hasAudio: true,
    isScreenSharing: false,
    setHasVideo:(hasVideo:boolean)=>{
      set({hasVideo})
    },
    setHasAudio:(hasAudio:boolean)=>{
      set({hasAudio})
    },
    init: (hasAudio: true, hasVideo: true) => {
      set({ hasAudio, hasVideo });
    },
    handleAddVideo: (
      peer: Peer.Instance | null,
      localStream: MediaStream | null
    ) => {
      if (peer) addVideo(peer);
      else startLocalVideo(localStream);
      set({ hasVideo: true });
    },
    handleAddAudio: (
      peer: Peer.Instance | null,
      localStream: MediaStream | null
    ) => {
      if (peer) addAudio(peer);
      else startLocalAudio(localStream);
      set({ hasAudio: true });
    },
    handleRemoveVideo: (
      peer: Peer.Instance | null,
      localStream: MediaStream | null
    ) => {
      if (peer) removeVideo(peer);
      else stopLocalVideo(localStream);
      set({ hasVideo: false });
    },
    handleRemoveAudio: (
      peer: Peer.Instance | null,
      localStream: MediaStream | null
    ) => {
      if (peer) removeVideo(peer);
      else stopLocalAudio(localStream);
      set({ hasAudio: false });
    },
    handleScreenShare: (peer: Peer.Instance | null) => {
      if (peer) screenShare(peer);
    },
    handleStopScreenShare: (peer: Peer.Instance | null) => {
      if (peer) stopScreenShare(peer);
      set({ isScreenSharing: false });
    },
  }))
);
export default useVideo;
