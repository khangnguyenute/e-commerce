import { LoadingSkeleton } from "@common/Components";
import { memo } from "react";

const ProductContainerGridSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex h-96 flex-col justify-start space-y-2 rounded-md border-2 border-gray-200 p-4 shadow-sm"
        >
          <LoadingSkeleton className="h-44 w-full rounded-md" />
          <LoadingSkeleton className="h-8 w-full rounded-3xl" />
          <LoadingSkeleton className="h-12 w-full" />
          <div className="flex items-center space-x-2">
            <LoadingSkeleton className="h-7 w-16" />
            <LoadingSkeleton className="h-7 w-16" />
          </div>
          <div className="flex items-center space-x-2">
            <LoadingSkeleton className="h-6 w-2/5" />
            <LoadingSkeleton className="h-6 w-2/5" />
            <LoadingSkeleton className="h-6 w-1/5" />
          </div>
          <div className="flex items-center space-x-2">
            <LoadingSkeleton className="h-6 w-6" />
            <LoadingSkeleton className="h-6 w-6" />
            <LoadingSkeleton className="h-6 w-9" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ProductContainerGridSkeleton);
