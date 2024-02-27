import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

const TableContentColumnClickable = ({ children, isClickable, onClick }) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div
      className={twMerge(
        "item flex cursor-default space-x-3",
        isClickable && "cursor-pointer font-semibold text-primary-700 "
      )}
      role="button"
      tabIndex={-1}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default memo(TableContentColumnClickable);
