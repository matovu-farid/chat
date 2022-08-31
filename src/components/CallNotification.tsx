import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AiFillPhone } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import usePeer from "../hooks/usePeer";
import SignalData from "../Interfaces/SignalData";
import socket from "../utils/socket_init";

interface Props {
  data: SignalData;
}

const CallNotification = ({ data }: Props) => {
  const {
    cancel,

    addSignalData,
    leave,
  } = usePeer();

  useEffect(() => {
    socket.on("callRejected", () => {
      console.log("rejected.....................");
      leave();
    });
  }, []);
  const router = useRouter();
  const handleAnswer = async () => {
    await addSignalData(data);
    router.push("/chat/video");
  };

  return (
    <div className="flex justify-center">
      <div className="flex gap-4 bg-gray-800  rounded-[30px] p-2">
        <div className="rounded-[50%] p-3 bg-red-600">
          <GrClose onClick={() => cancel()} className=" cursor-pointer" />
        </div>
        <button
          onClick={() => handleAnswer()}
          className="text-green-500 rounded-[50%] p-3 bg-white "
        >
          <AiFillPhone className="cursor-pointer " />
        </button>
      </div>
    </div>
  );
};

export default CallNotification;
