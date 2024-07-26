import { memo } from "react";
import { twMerge } from "tailwind-merge";

const OptionLegacy = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(
        "min-w-full whitespace-nowrap px-4 py-1.5 duration-200 hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default memo(OptionLegacy);
