import { flexRender } from "@tanstack/react-table";
import { includes } from "lodash";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

import TableContentBodyColumnContent from "./TableContentBodyColumnContent";
import TableContentBodyEmpty from "./TableContentBodyEmpty";
import TableContentBodySkeleton from "./TableContentBodySkeleton";

const TableContentBody = ({
  headers,
  hiddenColumnIds,
  isLoading = false,
  loadingType,
  rows,
  skeletons = 4,
  renderSubComponent,
}) => {
  return (
    <tbody>
      {rows.length === 0 && !isLoading && <TableContentBodyEmpty columns={headers.length} />}
      {rows.length > 0 &&
        rows.map((row) => (
          <Fragment key={row.id}>
            <tr>
              {row
                .getVisibleCells()
                .filter(({ column }) => !hiddenColumnIds.includes(column.id))
                .map((cell) => (
                  <td
                    key={cell.id}
                    className={twMerge(
                      "relative border-b border-gray-50 bg-white px-4 py-4 text-left",
                      cell.column.id === "selector" && "sticky left-0",
                      cell.column.id === "actions" && "sticky right-0",
                      cell.column.columnDef.meta?.className,
                      cell.column.columnDef.meta?.bodyClassName,
                    )}
                  >
                    {isLoading && <div className="absolute inset-0 z-10 bg-white bg-opacity-50" />}
                    <TableContentBodyColumnContent
                      content={flexRender(cell.column.columnDef.cell, cell.getContext())}
                      className={twMerge(includes(cell.column.id, "at") && "whitespace-nowrap")}
                    />
                  </td>
                ))}
            </tr>
            {row.getIsExpanded() && (
              <tr>
                <td className="p-0" colSpan={row.getVisibleCells().length}>
                  {renderSubComponent?.({ row })}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      {((rows.length === 0 && isLoading) || (isLoading && !!rows.length && loadingType === "infinite")) &&
        Array.from({ length: skeletons }).map((_, index) => (
          <TableContentBodySkeleton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            headers={headers.filter((header) => !hiddenColumnIds.includes(header.id))}
          />
        ))}
    </tbody>
  );
};

export default TableContentBody;
