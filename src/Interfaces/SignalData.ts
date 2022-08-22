import Peer from "simple-peer";
interface SignalData {
  signal: Peer.SignalData;
  from: string;
  to: string;
}
export default SignalData;
