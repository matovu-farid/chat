import React, { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  className?: string;
}

const Paper = ({ children, className = "" }: Props) => {
  return (
    <div
      className={
        "shadow-lg rounded-2xl text-gray-900 bg-white overflow-hidden  " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Paper;
