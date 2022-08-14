import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AiFillPlusCircle } from "react-icons/ai";

const Modal = () => {
  const container = document.createElement("div");
  container.className = "fixed top-0 left-0 z-10 h-screen w-screen";
  if (typeof window !== "undefined") {
    const parentElem = document.querySelector("#__next");
    if (parentElem) parentElem.appendChild(container);
  }
  useEffect(() => {
    return () => {
      const parentElem = document.querySelector("#__next");
      parentElem?.removeChild(container);
    };
  }, []);
  const handleOnClick=()=>{
    
  }

  return createPortal(
    <AiFillPlusCircle onClick={handleOnClick} className="text-4xl text-gray-900  absolute left-6 top-1/4"></AiFillPlusCircle>,

    container
  );
};

export default Modal;
