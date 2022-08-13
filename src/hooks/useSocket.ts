import { useContext } from "react";
import { socketCtx } from "../contexts/socket";

const useSocket = () => {
  const socket =  useContext(socketCtx);
  return socket;
};
export default useSocket;
