import Link from "next/link";
import React from "react";
interface Props {
  href?: string;
  onClick?: Function;
  children: React.ReactNode;
}

const Button = ({ href, onClick, children }: Props) => {
  return (
    <>
      {href && (
        <Link href={href}>
          <a
            className="bg-blue-500
          text-white rounded-md shadow-none no-underline
          active:bg-slate-600 py-2 px-4"
          >
            {children}
          </a>
        </Link>
      )}
      {onClick && (
        <button
          onClick={() => onClick()}
          className="bg-blue-500
          text-white rounded-md shadow-none 
          active:bg-slate-600 py-2 px-4"
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
