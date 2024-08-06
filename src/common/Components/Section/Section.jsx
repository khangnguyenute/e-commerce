import { memo } from "react";
import { twMerge } from "tailwind-merge";

const Section = ({ title, children, className }) => {
  return (
    <div
      className={twMerge(
        "mx-auto flex w-full flex-col space-y-4 rounded-lg border p-4 shadow-base sm:p-6",
        className,
      )}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default memo(Section);
