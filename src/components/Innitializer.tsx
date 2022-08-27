import React, { PropsWithChildren, useEffect } from "react";
import { Store } from "react-notifications-component";
import useUser from "../hooks/useUser";
import SignalData from "../Interfaces/SignalData";
import socket from "../utils/socket_init";
import CallNotification from "./CallNotification";

const Innitializer = ({ children }: PropsWithChildren) => {
  const user = useUser();
  const innitialize = async () => {
    await fetch("/api/socket");

    socket.emit("joinRooms", user.id);
    socket.emit("clientInfo", user.id);
    console.log("Innitializing");
  };
  useEffect(() => {
    innitialize();
    socket.on("called", (data: SignalData) => {
      Store.addNotification({
        title: "Call coming in",
        message: <CallNotification data={data} />,
        container: "top-right",
        type: "success",
      });
      return socket.removeListener();
    });
  }, []);
  return <>{children}</>;
};

export default Innitializer;
