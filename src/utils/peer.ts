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
        {
          "urls": [
          "turn:13.250.13.83:3478?transport=udp"
          ],
          "username": "YzYNCouZM1mhqhmseWk6",
          "credential": "YzYNCouZM1mhqhmseWk6"
          }
      ],
    },
    sdpTransform(sdp) {
      sdp.replace('useinbandfec=1', 'useinbandfec=1; maxaveragebitrate=510000');
      return sdp
    },
  });
  return peer;
};
