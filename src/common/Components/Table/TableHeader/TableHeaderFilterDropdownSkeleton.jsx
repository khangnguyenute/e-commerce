import { LoadingSkeleton } from "@common/Components/Loading";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

const TableHeaderFilterDropdownSkeleton = ({ isSingleSelection }) => {
  return (
    <div className="">
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton
          className={twMerge(isSingleSelection ? "rounded-full" : "rounded-md", "h-5 w-5 flex-shrink-0")}
        />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton
          className={twMerge(isSingleSelection ? "rounded-full" : "rounded-md", "h-5 w-5 flex-shrink-0")}
        />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton
          className={twMerge(isSingleSelection ? "rounded-full" : "rounded-md", "h-5 w-5 flex-shrink-0")}
        />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton
          className={twMerge(isSingleSelection ? "rounded-full" : "rounded-md", "h-5 w-5 flex-shrink-0")}
        />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default memo(TableHeaderFilterDropdownSkeleton);
