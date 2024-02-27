import { flexRender } from "@tanstack/react-table";

import TableContentHeaderColumn from "./TableContentHeaderColumn";

const TableContentHeader = ({ headerGroups, hiddenColumnIds }) => {
  return (
    <thead className="overflow-hidden">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className="relative">
          {headerGroup.headers
            .filter((header) => !hiddenColumnIds.includes(header.id))
            .map((header) => {
              if (header.column.columnDef.meta?.isHiddenTableHeader) {
                return null;
              }
              return (
                <TableContentHeaderColumn
                  key={header.id}
                  id={header.id}
                  className={header.column.columnDef.meta?.className}
                  headerClassName={
                    header.column.columnDef.meta?.headerClassName
                  }
                  isSorted={header.column.getIsSorted()}
                  isSortable={header.column.getCanSort()}
                  toggleSorting={header.column.toggleSorting}
                >
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TableContentHeaderColumn>
              );
            })}
        </tr>
      ))}
    </thead>
  );
};

export default TableContentHeader;
