import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Modal from "./Modal";
import Paper from "./Paper";
import VideoCaller from "./video_caller";

interface Props {
  calledId: string;
}
const VideoAdder = ({ calledId }: Props) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Modal>
      {showPopup || (
        <AiFillPlusCircle
          onClick={() => setShowPopup(true)}
          className="fixed left-6 top-[15%] text-4xl z-50 text-gray-900 hover:cursor-pointer hover:scale-125 hover:text-purple-600 active:text-purple-600 transition-all "
        ></AiFillPlusCircle>
      )}
      {showPopup && (
        <div className=" fixed left-[40%] top-[20%]">
          <Paper className="rouded-lg overflow-x-hidden">
            <VideoCaller closePopup={()=>setShowPopup(false)} calledId={calledId} />
          </Paper>
        </div>
      )}
    </Modal>
  );
};

export default VideoAdder;
