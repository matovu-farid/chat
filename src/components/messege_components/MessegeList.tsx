import React, { useState } from "react";
import Messege, { MessegeWithUser } from "../../Interfaces/Messege";
import TextMessege from "./TextMessege";
interface Props {
  messeges: MessegeWithUser[]
  className?: string
}
const MessegeList = ({messeges, className}:Props) => {


  return (
    <div className={className + ""}>
      <ul className="flex flex-col gap-2">
        {messeges.map((messege) => {
          return (

            <TextMessege key={messege.id} messege={messege}></TextMessege>
          );
        })}
      </ul>
    </div>
  );
};

export default MessegeList;
