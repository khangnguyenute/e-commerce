import { memo } from "react";
import { twMerge } from "tailwind-merge";

import TableContentBodySkeletonItem from "./TableContentBodySkeletonItem";

const TableContentBodySkeleton = ({ headers }) => {
  return (
    <tr>
      {headers.map((header, index) => (
        <td
          key={index}
          className={twMerge(
            "border-b border-gray-50 p-4",
            header.column.columnDef.meta?.bodySkeletonClassName
          )}
        >
          <TableContentBodySkeletonItem header={header} />
        </td>
      ))}
    </tr>
  );
};

export default memo(TableContentBodySkeleton);
