import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

const DropdownItem = ({ className, icon, text, value, onClick, onClickWithValue }) => {
  const handleClick = useCallback(() => {
    if (onClickWithValue && value) {
      onClickWithValue(value);
      return;
    }

    onClick?.();
  }, [onClick, onClickWithValue, value]);

  return (
    <div
      className={twMerge(
        "no-click-flicking mb-2 flex items-center justify-start space-x-3 rounded-lg bg-white px-4 py-3 duration-200 last:mb-0 hover:bg-gray-200 md:mb-0 md:rounded",
        "text-base font-semibold lg:font-normal",
        className,
      )}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      {icon && <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">{icon}</div>}
      <span>{text}</span>
    </div>
  );
};

export default memo(DropdownItem);
