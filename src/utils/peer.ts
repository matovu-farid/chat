import Peer from "simple-peer";
interface PeerOptions {
  stream?: MediaStream;
  innititor?: boolean;
}
export const createPeer = ({ stream, innititor = false }: PeerOptions) => {
  const peer = new Peer({
    initiator: innititor,
    trickle: false,
    stream,
    config: {
      iceServers: [
        {
          urls: "stun:openrelay.metered.ca:80",
        },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443?transport=tcp",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ],
    },
  });
  return peer;
};
