import { ReactNode } from "react";
import { createPortal } from "react-dom";
interface Props {
  children: ReactNode;
  className?: string;
}
const Modal = ({ children, className }: Props) => {
  if (typeof window === "undefined") return <div></div>;
  const existingContainer = document.querySelector("#__container");
  if (existingContainer) {
    return createPortal(children, existingContainer);
  }
  const container = document.createElement("div");
  container.id = "__container";
  if (className) container.className = className;

  const parentElem = document.querySelector("#__next");
  if (parentElem) parentElem.appendChild(container);

  return createPortal(children, container);
};

export default Modal;
