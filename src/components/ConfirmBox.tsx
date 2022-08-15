import React from "react";
import Paper from "./Paper";
interface Props {
  onConfirm: Function;
  onCancel?: Function;
  content?: string;
  title?: string;
  className?: string;
  isShown: boolean;
}

const ConfirmBox = ({
  onConfirm,
  onCancel,
  content,
  title,
  className,
  isShown,
}: Props) => {
  const buttonClasses =
    "rounded-xl bg-white text-blue-600 border-2 hover:invert transition-colors py-1 px-2";
  return (
    isShown && (
      <div className={className + "  "}>
        <Paper className="p-3">
          {title && <h3 className="py-2 px-3">{title}</h3>}
          {content && <h4 className="py-2 px-3">{content}</h4>}
          <div className="py-1 flex gap-2 justify-end">
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
    )
  );
};

export default ConfirmBox;
