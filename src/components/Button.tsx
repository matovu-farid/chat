import Link from "next/link";
import React from "react";
interface Props {
  href?: string;
  onClick?: ()=>void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ href, onClick, children,className='' }: Props) => {
  return (
    <>
      {href && (
        <Link href={href}>
          <a
            className={className + " bg-blue-500 text-white rounded-md shadow-none no-underline active:bg-slate-600 py-2 px-4"}
          >
            {children}
          </a>
        </Link>
      )}
      {onClick && (
        <button
          onClick={() => onClick()}
          className={className + " bg-blue-500 text-white rounded-md shadow-noneactive:bg-slate-600 py-2 px-4"}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
