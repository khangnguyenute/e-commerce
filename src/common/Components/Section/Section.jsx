import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { LoadingSkeleton } from "../Loading";

const Section = ({ isLoading, title, className = "bg-transparent", children }) => {
  return (
    <div className={twMerge("flex flex-col space-y-4 rounded-xl py-4 md:py-6 lg:py-8", className)}>
      {isLoading && <LoadingSkeleton className="mx-auto h-12 w-96" />}
      {!isLoading && (
        <div className="w-full text-center text-2xl font-bold uppercase text-white sm:text-4xl lg:text-5xl">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default memo(Section);
