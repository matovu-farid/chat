import React, { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import { AiFillPlusCircle } from "react-icons/ai";

const Modal = ({ children }: PropsWithChildren) => {
  const container = document.createElement("div");
  container.className = "";

  const parentElem = document.querySelector("#__next");
  if (parentElem) parentElem.appendChild(container);



  return createPortal(children, container);
};

export default Modal;
