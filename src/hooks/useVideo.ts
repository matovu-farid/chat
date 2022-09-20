import { devtools } from "zustand/middleware";
import create from "zustand";
import Peer from "simple-peer";
import {
  addAudio,
  addVideo,
  removeAudio,
  removeVideo,
  screenShare,
  startLocalAudio,
  startLocalVideo,
  stopLocalAudio,
  stopLocalVideo,
  stopScreenShare,
} from "../utils/stream";
import { immer } from "zustand/middleware/immer";

interface VideoState {
  hasVideo: boolean;
  hasAudio: boolean;
  isScreenSharing: boolean;
  init: (hasAudio: true, hasVideo: true) => void;
  handleAddVideo: (
    peer: Peer.Instance[],
    localStream: MediaStream | null
  ) => void;
  handleRemoveVideo: (
    peer: Peer.Instance[],
    localStream: MediaStream | null
  ) => void;
  handleAddAudio: (
    peer: Peer.Instance[],
    localStream: MediaStream | null
  ) => void;
  handleRemoveAudio: (
    peer: Peer.Instance[],
    localStream: MediaStream | null
  ) => void;
  handleScreenShare: (peer: Peer.Instance[]) => void;
  handleStopScreenShare: (peer: Peer.Instance | Peer.Instance[]) => void;
  setHasVideo: (hasVideo: boolean) => void;
  setHasAudio: (hasAudio: boolean) => void;
}

const useVideo = create<VideoState>()(
  immer(
    devtools((set, get) => ({
      hasVideo: true,
      hasAudio: true,
      isScreenSharing: false,
      setHasVideo: (hasVideo: boolean) => {
        set({ hasVideo });
      },
      setHasAudio: (hasAudio: boolean) => {
        set({ hasAudio });
      },
      init: (hasAudio: true, hasVideo: true) => {
        set({ hasAudio, hasVideo });
      },

      handleAddVideo: (
        peers: Peer.Instance[],
        localStream: MediaStream | null
      ) => {
        peers.forEach((peer) => addVideo(peer));
        if (peers.length === 0) startLocalVideo(localStream);
        set({ hasVideo: true });
      },
      handleAddAudio: (
        peers: Peer.Instance[],
        localStream: MediaStream | null
      ) => {
        peers.forEach((peer) => addAudio(peer));
        if (peers.length === 0) startLocalAudio(localStream);
        set({ hasAudio: true });
      },
      handleRemoveVideo: (
        peers: Peer.Instance[],
        localStream: MediaStream | null
      ) => {
        peers.forEach((peer) => removeVideo(peer));
        if (peers.length === 0) stopLocalVideo(localStream);
        set({ hasVideo: false });
      },
      handleRemoveAudio: (
        peers: Peer.Instance[],
        localStream: MediaStream | null
      ) => {
        peers.forEach((peer) => removeAudio(peer));
        if (peers.length === 0) stopLocalAudio(localStream);
        set({ hasAudio: false });
      },
      handleScreenShare: (peers: Peer.Instance[]) => {
        peers.forEach((peer) =>
          screenShare(peer, (track) => {
            track.onended = () => {
              get().handleStopScreenShare(peer);
            };
          })
        );

        set({ isScreenSharing: true });
      },
      handleStopScreenShare: (peer: Peer.Instance | Peer.Instance[]) => {
        if (Array.isArray(peer)) peer.forEach((p) => stopScreenShare(p));
        else stopScreenShare(peer);
        set({ isScreenSharing: false });
      },
    }))
  )
);
export default useVideo;
