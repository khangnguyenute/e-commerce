import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import TableFooterPageSizeSelector from "./TableFooterPagination/TableFooterPageSizeSelector";
import TableFooterPagination from "./TableFooterPagination/TableFooterPagination";
import TableFooterSkeleton from "./TableFooterSkeleton";

const TableFooter = (
  {
    className,
    dataLength = 0,
    isLoading = false,
    sizes,
    totalRows = 0,
    totalPages = 1,
    pageIndex = 0,
    pageSize = 10,
    onChangePageIndex: onChangePage,
    onChangePageSize,
  },
  ref,
) => {
  const { t } = useTranslation();

  const [showingFrom, setShowingFrom] = useState(1);
  const [showingTo, setShowingTo] = useState(1);

  const handleChangePageIndex = useCallback(
    (page) => {
      onChangePage(page);
    },
    [onChangePage],
  );

  useImperativeHandle(
    ref,
    () => ({
      onChangePageIndex: handleChangePageIndex,
    }),
    [handleChangePageIndex],
  );

  useEffect(() => {
    let newShowingFrom = 1;
    let newShowingTo = (pageIndex + 1) * pageSize;

    if (pageIndex > 0) {
      newShowingFrom = pageIndex * pageSize + 1;
    }

    if (newShowingTo > totalRows) {
      newShowingTo = totalRows;
    }

    setShowingFrom(newShowingFrom);
    setShowingTo(newShowingTo);
  }, [pageIndex, totalRows, pageSize]);

  return (
    <div
      className={twMerge("relative mt-4 flex flex-wrap items-center justify-start gap-6 md:mt-6", className)}
    >
      {(!isLoading || !!dataLength) && (
        <>
          <div className="flex flex-1 items-center space-x-4">
            <TableFooterPageSizeSelector
              pageSize={pageSize}
              sizes={sizes}
              onChangePageSize={onChangePageSize}
            />
            <div className="xs:hidden sm:hidden md:block">
              {t("viewingFromToOf", {
                from: showingFrom,
                to: showingTo,
                total: totalRows,
              })}
            </div>
          </div>
          <TableFooterPagination
            pageIndex={pageIndex}
            totalPages={totalPages}
            onChangePageIndex={handleChangePageIndex}
          />
          {isLoading && <div className="absolute inset-0 bg-white bg-opacity-50" />}
        </>
      )}
      {isLoading && !dataLength && <TableFooterSkeleton />}
    </div>
  );
};

export default memo(forwardRef(TableFooter));
