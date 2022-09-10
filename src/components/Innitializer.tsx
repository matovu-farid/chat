import React, { PropsWithChildren, useEffect } from "react";
import { Store } from "react-notifications-component";
import useUser from "../hooks/useUser";
import SignalData, { CallInfo } from "../Interfaces/SignalData";
import socket from "../utils/socket_init";
import CallNotification from "./CallNotification";

const Innitializer = ({ children }: PropsWithChildren) => {
  const user = useUser();
  const innitialize = async () => {
    await fetch("/api/socket");

    socket.emit("joinRooms", user.id);
    socket.emit("clientInfo", user.id);

    socket.emit('iam_online',user.id)
  };
  useEffect(() => {
    innitialize();
    socket.on("called", (data: SignalData) => {
      console.log(data)
      socket.emit('ringing',{calledId:data.to,callerId:data.from})
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
      socket.on('ringing',()=>{
        Store.addNotification({
          title: `Ringing`,
          container: "top-right",
          type: "success",
        });
      })
    });
    socket.on('are_you_online', () => {
      socket.emit('iam_online',user.id)
    })

    // return () => {
    //   socket.removeListener();
    // };
  }, []);
  return <>{children}</>;
};

export default Innitializer;
