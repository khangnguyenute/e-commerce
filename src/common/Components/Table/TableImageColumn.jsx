import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "../Loading";

const TableImageColumn = ({
  alt,
  skeleton = false,
  src,
  className,
  classNameImg,
  classNameSkeleton,
}) => {
  return (
    <div className={twMerge("h-12 w-12 rounded-full bg-gray-100", className)}>
      {(skeleton || !src) && (
        <LoadingSkeleton
          className={twMerge("h-full w-full rounded-full", classNameSkeleton)}
        />
      )}
      {!skeleton && src && (
        <img
          src={src}
          alt={alt}
          className={twMerge(
            "h-full w-full rounded-full border-2 border-gray-100 object-cover object-center",
            classNameImg
          )}
        />
      )}
    </div>
  );
};

export default memo(TableImageColumn);
