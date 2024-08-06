import { LoadingSkeleton } from "@common/Components";
import { memo } from "react";

const ProductContainerGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <LoadingSkeleton key={index} className="h-36 xs:h-80" />
      ))}
    </div>
  );
};

export default memo(ProductContainerGridSkeleton);
