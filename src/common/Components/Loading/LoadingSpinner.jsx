import { memo } from "react";
import { twMerge } from "tailwind-merge";

const LoadingSpinner = ({ className }) => {
  return (
    <div
      className={twMerge(
        "h-12 w-12 animate-spin rounded-full border-4 border-primary-500",
        className,
        "border-t-transparent"
      )}
    />
  );
};

export default memo(LoadingSpinner);
