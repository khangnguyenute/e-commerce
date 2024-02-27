import { flexRender } from "@tanstack/react-table";
import { memo, useMemo } from "react";

import TableRowActionSkeleton from "../TableRowActionSkeleton";
import { LoadingSkeleton } from "@common/Components/Loading";

const TableContentBodySkeletonItem = ({ header }) => {
  const columnMeta = useMemo(() => header.column.columnDef.meta, [header.column.columnDef.meta]);

  if (header.id === "actions" && columnMeta?.skeleton == null) {
    return <TableRowActionSkeleton />;
  }

  if (columnMeta?.skeleton != null) {
    const element = flexRender(columnMeta.skeleton, header.getContext());
    return element;
  }

  return <LoadingSkeleton className="h-4 w-full" />;
};

export default memo(TableContentBodySkeletonItem);
