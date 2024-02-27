import { memo } from "react";
import { twMerge } from "tailwind-merge";

const LoadingSkeleton = ({ className }) => {
  return (
    <div
      className={twMerge("animate-pulse rounded-lg bg-gray-100", className)}
    />
  );
};

export default memo(LoadingSkeleton);
