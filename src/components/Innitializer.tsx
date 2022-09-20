import React, { PropsWithChildren, useEffect } from "react";
import { Store } from "react-notifications-component";
import useUser from "../hooks/useUser";
import SignalData, { CallInfo } from "../Interfaces/SignalData";
import { createPeer } from "../utils/peer";
import socket from "../utils/socket_init";
import CallNotification from "./CallNotification";
import { getLocalStream } from "../utils/stream";
import usePeer from "../hooks/usePeer";
import { CallEvent, RoomEvent, SocketEvent } from "../utils/events";

const Innitializer = ({ children }: PropsWithChildren) => {
  const user = useUser();
  const { call } = usePeer();
  const innitialize = async () => {
    await fetch("/api/socket");

    socket.emit(RoomEvent.joinRooms, user.id);
    socket.emit(SocketEvent.clientInfo, user.id);

    socket.emit(SocketEvent.iam_online, user.id);
  };
  useEffect(() => {
    innitialize();
    socket.on(CallEvent.called, (data: SignalData) => {
      console.log(data);
      socket.emit(SocketEvent.ringing, {
        calledId: data.to,
        callerId: data.from,
      });
      Store.addNotification({
        title: `${data.callerName} is calling`,
        message: (
          <div>
            <CallNotification data={data} />
          </div>
        ),
        container: "top-right",
        type: "success",
      });
      socket.on(SocketEvent.ringing, () => {
        Store.addNotification({
          title: `Ringing`,
          container: "top-right",
          type: "success",
        });
      });
    });
    socket.on(SocketEvent.are_you_online, () => {
      socket.emit(SocketEvent.iam_online, user.id);
    });

    return () => {
      socket.removeListener();
    };
  }, []);
  return <>{children}</>;
};

export default Innitializer;
