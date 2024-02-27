import { memo } from "react";

import { LoadingSkeleton } from "../Loading";

const TableRowActionSkeleton = ({ numberOfActions = 2 }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      {Array.from({ length: numberOfActions || 1 }).map((_, index) => (
        <LoadingSkeleton key={index} className="h-8 w-8" />
      ))}
    </div>
  );
};

export default memo(TableRowActionSkeleton);
