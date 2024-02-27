import { debounce, isArray, isEmpty, keys } from "lodash";
import { createRef, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuFilter } from "react-icons/lu";
import { MdZoomInMap } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import TableHeaderFilterGroup from "./TableHeaderFilterGroup";
import TableHeaderSearch from "./TableHeaderSearch";
import { LoadingSkeleton } from "@common/Components/Loading";
import useWatchParam from "@hooks/useWatchParam";

const TableHeader = ({ id, filterClassName, columnFilter, headerGroups, searchGroup, onChangeFilter }) => {
  const { t } = useTranslation();

  const [isReady, setIsReady] = useState(false);
  const [filterParam, setFilterParam] = useWatchParam("filter");
  const [isShowFilterMobile, setIsShowFilterMobile] = useState(false);
  const tableFilterRef = useRef([]);
  const tableSearchRef = useRef(null);

  const isReadyRef = useRef(false);

  const handleToggle = useCallback(() => {
    setIsShowFilterMobile((prev) => !prev);
  }, []);

  const filterHeaders = useMemo(() => {
    return headerGroups[0].headers.filter(
      ({
        column: {
          columnDef: { meta },
        },
      }) => {
        if (!meta) {
          return false;
        }

        const { getFilterOptions, filterType, filterDependOn } = meta;

        if (!getFilterOptions && !filterType) {
          return false;
        }

        if (filterDependOn) {
          const [dependOn, ...dependValues] = filterDependOn;
          const columnFilterValues =
            columnFilter.find((item) => item.filterBy.includes(dependOn))?.values ?? [];
          return columnFilterValues.some((value) => dependValues.includes(value));
        }

        return true;
      },
    );
  }, [columnFilter, headerGroups]);

  const isFiltered = useMemo(() => {
    const selectedilters = columnFilter.filter((filter) => !filter.filterBy.includes("search"));
    return !isEmpty(selectedilters);
  }, [columnFilter]);

  const formatFilter = useCallback(
    (filters) => {
      if (!id) {
        return filters;
      }

      return filters.filter((item) => item.filterBy.includes(`_${id}`));
    },
    [id],
  );

  const defaultFilter = useMemo(() => {
    if (!filterParam) {
      return null;
    }

    const decoded = decodeURIComponent(filterParam);

    const filterStrings = decoded.split(";");
    const filters = filterStrings.map((filterString) => {
      const [filterBy, value] = filterString.split("=");
      return {
        filterBy,
        values: value.split(",").map((item) => item.replace(/\+/g, " ")),
      };
    });

    return formatFilter(filters);
  }, [filterParam, formatFilter]);

  const syncFilter = useCallback(
    (state) => {
      const tmpSearchParams = new URLSearchParams();

      state.forEach((filter) => {
        const { filterBy, values } = filter;

        if (values?.length) {
          tmpSearchParams.set(filterBy, values.join(","));
        }
      });

      const searchParamsString = tmpSearchParams.toString().replace(/&/g, ";");

      setFilterParam(searchParamsString);
    },
    [setFilterParam],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeFilterDebounce = useCallback(debounce(onChangeFilter, 800), []);

  const handleChangeColumnFilter = useCallback(
    (key, values, groupKey) => {
      onChangeFilterDebounce?.((prev) => {
        const fieldInGroup = keys(searchGroup?.find((item) => item.key === groupKey)?.field ?? {});
        const newColumnFilter = prev.filter((item) => {
          if (groupKey) {
            const [, filed] = item.filterBy.split(".");
            return !fieldInGroup.includes(filed);
          }

          if (isArray(key)) {
            return !key.includes(item.filterBy);
          }

          return item.filterBy !== key;
        });

        if (values.length) {
          if (isArray(key)) {
            values.forEach((value, index) => newColumnFilter.push({ filterBy: key[index], values: [value] }));
          } else {
            newColumnFilter.push({ filterBy: key, values });
          }
        }

        if (isReadyRef.current && !id) {
          syncFilter(newColumnFilter);
        }

        return formatFilter(newColumnFilter);
      });
    },
    [formatFilter, id, onChangeFilterDebounce, searchGroup, syncFilter],
  );

  tableFilterRef.current = filterHeaders.map((_, index) => tableFilterRef.current[index] ?? createRef());

  const handleClickClearAll = useCallback(() => {
    if (isEmpty(columnFilter)) {
      return;
    }

    tableFilterRef.current.forEach((ref) => ref.current?.onClickClearAll());
    tableSearchRef.current?.onClickClearAll();

    onChangeFilter?.([]);
    setFilterParam("");
  }, [columnFilter, onChangeFilter, setFilterParam]);

  useEffect(() => {
    if (isReadyRef.current) {
      return;
    }

    if (defaultFilter) {
      onChangeFilterDebounce?.(defaultFilter);
    }

    setIsReady(true);
    isReadyRef.current = true;
  }, [defaultFilter, onChangeFilterDebounce]);

  if (!isReady) {
    return (
      <div className="mb-2 flex h-14 items-start space-x-4">
        <LoadingSkeleton className="h-10 w-72" />
        <LoadingSkeleton className="h-10 w-24" />
        <LoadingSkeleton className="h-10 w-36" />
      </div>
    );
  }

  return (
    <div className={twMerge("relative flex items-start space-x-4", searchGroup?.length && "pb-1.5")}>
      <div className="flex flex-1 flex-wrap items-center justify-start">
        <div className={twMerge("flex md:w-fit", !isEmpty(searchGroup) && "w-full")}>
          {!isEmpty(searchGroup) &&
            searchGroup?.map(({ key, field }) => (
              <TableHeaderSearch
                id={id}
                key={key}
                field={field}
                groupKey={key}
                ref={tableSearchRef}
                onChangeFilter={handleChangeColumnFilter}
              />
            ))}
          {!isEmpty(filterHeaders) && (
            <div className={twMerge("mb-4 block md:hidden", isEmpty(searchGroup) && "mr-4")}>
              <button
                type="button"
                className={twMerge(
                  "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-100 bg-gray-50",
                  isFiltered && "border-blue-500 bg-blue-50 text-blue-500",
                )}
                onClick={handleToggle}
              >
                {!isShowFilterMobile && <LuFilter size={16} />}
                {isShowFilterMobile && <MdZoomInMap size={16} />}
              </button>
            </div>
          )}
        </div>
        <TableHeaderFilterGroup
          id={id}
          headers={filterHeaders}
          filterClassName={twMerge("hidden md:block", filterClassName, isShowFilterMobile && "block")}
          onChangeFilters={handleChangeColumnFilter}
          tableFilterRef={tableFilterRef}
        />
        {!isEmpty(filterHeaders) && (
          <div
            className={twMerge(
              "mb-4 hidden h-10 cursor-not-allowed items-center rounded-lg border-2 border-gray-200 px-4 opacity-50 duration-100 md:flex",
              !isEmpty(columnFilter) && "cursor-pointer border-blue-500 bg-blue-50 opacity-100",
              isShowFilterMobile && "flex",
            )}
            role="button"
            tabIndex={0}
            onClick={handleClickClearAll}
          >
            {t("clearAll")}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TableHeader);
