import Peer from "simple-peer";
interface SignalData {
  signal: Peer.SignalData;
  from: string;
  to: string;
  callerName?: string;
}
export default SignalData;
export interface PeerObject {
  peer: Peer.Instance;
  new: boolean;
}
export interface StreamObject {
  stream: MediaStream | null;
  hasStream: boolean;
}
export type Cleanup = () => void;
export interface CallInfo {
  calledId: string;
  callerId: string;
  callerName?: string | null;
}
