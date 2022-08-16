import React from "react";
import Paper from "./Paper";
interface Props {
  onConfirm: ()=>void;
  onCancel?: ()=>void;
  content?: string;
  title?: string;
  className?: string;
  isShown?: boolean;
}

const ConfirmBox = ({
  onConfirm,
  onCancel,
  content,
  title,
  className,
  isShown=false,
}: Props) => {
  const buttonClasses =
    "rounded-xl bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors py-1 px-2";
  return (
    isShown?(
      <div className={className + "  fixed z-10"}>
        <Paper className="p-3">
          {title && <h3 className="py-2 px-3">{title}</h3>}
          {content && <h4 className="py-2 px-3">{content}</h4>}
          <div className="py-1 flex gap-2 justify-end ">
            {onCancel && (
              <button
                onClick={() => onCancel()}
                className={buttonClasses + "  "}
              >
                Cancel
              </button>
            )}
            {onConfirm && (
              <button onClick={() => onConfirm()} className={buttonClasses}>
                Confirm
              </button>
            )}
          </div>
        </Paper>
      </div>
    ):null
  );
};

export default ConfirmBox;
