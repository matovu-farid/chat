import React, { PropsWithChildren, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AiFillPlusCircle } from "react-icons/ai";
interface Props {
  children:ReactNode,
  className?:string
}
const Modal = ({ children,className}: Props) => {
  const container = document.createElement("div");
  if(className)
  container.className = className;

  const parentElem = document.querySelector("#__next");
  if (parentElem) parentElem.appendChild(container);



  return createPortal(children, container);
};

export default Modal;
