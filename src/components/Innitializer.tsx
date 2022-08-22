import React, { PropsWithChildren, useEffect } from "react";
import useUser from "../hooks/useUser";
import socket from "../utils/socket_init";

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
  }, []);
  return <>{children}</>;
};

export default Innitializer;
