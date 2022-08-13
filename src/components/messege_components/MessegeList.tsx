import React, { useState } from "react";
import Messege from "../../Interfaces/Messege";
interface Props {
  messeges: Messege[];
}
const MessegeList = ({messeges}:Props) => {


  return (
    <div>
      <ul>
        {messeges.map(({ text }, id) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessegeList;
