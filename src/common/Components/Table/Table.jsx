import { getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { first, isEmpty } from "lodash";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { selectorColumn } from "./TableColumn/SelectorColumn";
import TableContentBody from "./TableContentBody/TableContentBody";
import TableContentHeader from "./TableContentHeader/TableContentHeader";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader/TableHeader";
import useWatchParam from "@hooks/useWatchParam";
import { normalizeTableColumns } from "@utils/Helpers";

const Table = ({
  id,
  columns: columnsProp,
  columnVisibility,
  children,
  data,
  enableMultiRowSelection = true,
  footerClassName,
  headerFilterClassName,
  isLoading = false,
  isShowFooter = true,
  isShowViewToggle: isShowViewToggleProp = true,
  isShowHeader,
  loadingType = "pagination",
  searchGroup,
  skeletons,
  totalRows = 0,
  pageSizes,
  renderSubComponent,
  getRowCanExpand,
  onChangeState,
  onChangeRowSelection,
}) => {
  const paginationRef = useRef(null);

  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: first(pageSizes) ?? 10,
  });
  const [columnSorting, setColumnSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilter, setColumnFilter] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [filterParam] = useWatchParam("filter");

  const columns = useMemo(() => [selectorColumn, ...columnsProp], [columnsProp]);
  const isShowViewToggle = useMemo(
    () => isShowViewToggleProp && !!children,
    [children, isShowViewToggleProp],
  );

  const table = useReactTable({
    columns: normalizeTableColumns(columns),
    data,
    manualSorting: true,
    manualPagination: true,
    state: {
      pagination,
      sorting: columnSorting,
      rowSelection,
      columnVisibility,
      expanded,
    },
    pageCount: totalPages,
    enableMultiRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id || row.code || row.key || row._id || 0,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setColumnSorting,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.children,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tableRows = useMemo(() => table.getRowModel().rows, [table, data]);
  const tableHeaderGroup = useMemo(() => table.getHeaderGroups(), [table]);

  const handleChangePageSize = useCallback(
    (pageSize) => {
      table.setPagination({
        pageSize,
        pageIndex: 0,
      });
    },
    [table],
  );

  const hiddenColumnIds = useMemo(() => {
    return tableHeaderGroup[0].headers
      .filter(
        ({
          column: {
            columnDef: { meta },
          },
        }) => meta?.isHiddenColumn,
      )
      .map((header) => header.id);
  }, [tableHeaderGroup]);

  const handleChangePageIndex = useCallback((page) => {
    paginationRef.current?.onChangePageIndex(page);
  }, []);

  const handleChangeFilter = useCallback(
    (filter) => {
      setColumnFilter?.(filter);
      handleChangePageIndex?.(0);
    },
    [handleChangePageIndex],
  );

  useEffect(() => {
    const paginationOptions = pagination;
    const newTotalPages = Math.ceil(totalRows / paginationOptions.pageSize) || 1;

    setTotalPages(newTotalPages);
  }, [pagination, totalRows]);

  useEffect(() => {
    if (filterParam && isEmpty(columnFilter)) {
      return;
    }

    onChangeState?.({
      filterParams: columnFilter,
      sortParams: columnSorting,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      loadingType,
    });
  }, [pagination, columnFilter, filterParam, onChangeState, columnSorting, loadingType]);

  useEffect(() => {
    onChangeRowSelection?.(rowSelection);
  }, [onChangeRowSelection, rowSelection]);

  return (
    <div>
      {isShowHeader !== false && (
        <TableHeader
          id={id}
          isShowViewToggle={isShowViewToggle}
          filterClassName={headerFilterClassName}
          columnFilter={columnFilter}
          headerGroups={tableHeaderGroup}
          searchGroup={searchGroup}
          onChangeFilter={handleChangeFilter}
        />
      )}

      {children}

      {!children && (
        <div className="overflow-auto">
          <table className="relative min-w-full">
            <TableContentHeader headerGroups={tableHeaderGroup} hiddenColumnIds={hiddenColumnIds} />
            <TableContentBody
              rows={tableRows}
              headers={tableHeaderGroup[0].headers}
              hiddenColumnIds={hiddenColumnIds}
              isLoading={isLoading}
              loadingType={loadingType}
              renderSubComponent={renderSubComponent}
              skeletons={skeletons}
            />
          </table>
        </div>
      )}

      {(!!tableRows.length || isLoading) && isShowFooter && loadingType === "pagination" && (
        <TableFooter
          ref={paginationRef}
          className={footerClassName}
          dataLength={tableRows.length}
          isLoading={isLoading}
          sizes={pageSizes}
          totalRows={totalRows ?? 0}
          totalPages={totalPages}
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          onChangePageIndex={table.setPageIndex}
          onChangePageSize={handleChangePageSize}
        />
      )}
    </div>
  );
};

export default memo(Table);
