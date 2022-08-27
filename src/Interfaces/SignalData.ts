import Peer from "simple-peer";
interface SignalData {
  signal: Peer.SignalData;
  from: string;
  to: string;
}
export default SignalData;
export interface PeerObject {
  peer: Peer.Instance;
  new: boolean;
}
export interface StreamObject {
  stream?: MediaStream;
  hasStream: boolean;
}
