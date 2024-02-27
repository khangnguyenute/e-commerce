import { forwardRef, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "../Loading";

const Avatar = ({ alt, skeleton = false, src, className, imageClassName, ...props }, ref) => {
  const availabelBGColors = useMemo(() => ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"], []);

  return (
    <div
      className={twMerge(
        "relative h-12 w-12 flex-shrink-0 cursor-pointer rounded-full bg-gray-100 text-xl",
        className,
      )}
      {...props}
      ref={ref}
    >
      {(skeleton || !src) && (
        <LoadingSkeleton className={twMerge("h-12 w-12 rounded-full", imageClassName)} />
      )}
      {!skeleton && src && (
        <img
          src={src}
          alt={alt}
          className={twMerge(
            "h-full w-full rounded-full border-2 border-gray-100 object-cover object-center",
            imageClassName,
          )}
        />
      )}
      {!skeleton && !src && (
        <div
          className={twMerge(
            "absolute inset-0 flex h-full w-full items-center justify-center rounded-full border-2 border-gray-100 font-semibold uppercase text-white",
            availabelBGColors[Math.floor(Math.random() * availabelBGColors.length)],
            imageClassName,
          )}
        >
          {alt?.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default memo(forwardRef(Avatar));
