import { memo } from "react";
import { twMerge } from "tailwind-merge";

import TableContentHeaderSortIcon from "./TableContentHeaderSortIcon";

const TableContentHeaderColumn = ({
  id,
  isSortable,
  isSorted,
  children,
  toggleSorting,
  className,
  headerClassName,
}) => {
  const handleClickSortButton = () => {
    if (isSortable) {
      const newSortDirection = isSorted === "asc" ? "desc" : "asc";
      toggleSorting(newSortDirection === "desc");
    }
  };

  return (
    <th
      key={id}
      className={twMerge(
        "whitespace-nowrap border-gray-50 bg-gray-50 px-4 py-4 text-left font-semibold first:rounded-l-lg last:rounded-r-lg",
        id === "selector" && "sticky left-0 z-10",
        id === "actions" && "sticky right-0 z-10",
        className,
        headerClassName
      )}
    >
      <div
        className={twMerge(
          "group relative block cursor-pointer",
          isSortable && "inline-flex"
        )}
        role="button"
        tabIndex={0}
        onClick={handleClickSortButton}
      >
        <div
          className={twMerge(
            "duration-100",
            Boolean(isSorted) && "left-0 translate-x-0"
          )}
        >
          {children}
        </div>
        {isSortable && (
          <TableContentHeaderSortIcon
            isSorted={isSorted}
            className="ml-1 opacity-0 transition-transform duration-100 group-hover:opacity-100"
          />
        )}
      </div>
    </th>
  );
};

export default memo(TableContentHeaderColumn);
