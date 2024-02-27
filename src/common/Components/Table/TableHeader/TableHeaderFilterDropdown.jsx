import { debounce, uniq } from "lodash";
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOnClickOutside } from "usehooks-ts";

import TableHeaderFilterDropdownOptionItem from "./TableHeaderFilterDropdownOptionItem";
import TableHeaderFilterDropdownSkeleton from "./TableHeaderFilterDropdownSkeleton";
import { LoadingSkeleton } from "@common/Components/Loading";

const TableHeaderFilterDropdown = ({
  isShowDropdownMenu,
  filterBy,
  filterType,
  isSingleSelection = true,
  isLoading,
  filterOptions,
  selectedFilters,
  onChangeFilters,
  onChangeFilterSearchValue,
  onClearSelectedFilters,
  onHide,
}) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  const [filterSearchValue, setFilterSearchValue] = useState("");

  const handleGetNewSelectedFilter = useCallback(
    (value, checked, customValue) => {
      if (isSingleSelection) {
        return [customValue || value];
      }
      const newSelectedFilters = [...selectedFilters];
      if (checked) {
        newSelectedFilters.push(customValue || value);
      } else {
        const index = newSelectedFilters.indexOf(value);
        if (index > -1) {
          newSelectedFilters.splice(index, 1);
        }
      }
      return uniq(newSelectedFilters);
    },
    [isSingleSelection, selectedFilters],
  );

  const handleChangeSelectedFilter = useCallback(
    (value, checked) => {
      const newSelectedFilters = handleGetNewSelectedFilter(value, checked);

      onChangeFilters?.(newSelectedFilters);
    },
    [handleGetNewSelectedFilter, onChangeFilters],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeFilterSearchValueDebounced = useCallback(debounce(onChangeFilterSearchValue, 500), [
    onChangeFilterSearchValue,
  ]);

  const handleChangeFilterSearchValue = useCallback(
    (e) => {
      const { value } = e.target;
      onChangeFilterSearchValueDebounced(value);
      setFilterSearchValue(value);
    },
    [onChangeFilterSearchValueDebounced],
  );

  const setDropdownPosition = useCallback(() => {
    const dropdownElement = dropdownRef.current;
    if (!dropdownElement) {
      return;
    }
    const space = 8;

    const overflowHeight = window.innerHeight - dropdownElement.getBoundingClientRect().top - space;

    if (overflowHeight < dropdownElement.offsetHeight) {
      dropdownElement.style.height = `${overflowHeight}px`;
    }
  }, []);

  useLayoutEffect(() => {
    setDropdownPosition();
  }, [setDropdownPosition, isShowDropdownMenu, isLoading]);

  useOnClickOutside(dropdownRef, onHide);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 z-30 flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-4 text-slate-700 shadow-lg shadow-gray-100"
    >
      {filterType !== "rangeDate" && (
        <div className="mb-2.5 h-10">
          <input
            id="filterValue"
            name="filterValue"
            placeholder={t("search")}
            className="h-10 border-b-2 border-gray-50 outline-none disabled:cursor-not-allowed disabled:bg-transparent"
            disabled={isLoading}
            value={filterSearchValue}
            onChange={handleChangeFilterSearchValue}
          />
        </div>
      )}
      <div className="relative overflow-y-scroll scrollbar-none">
        {!isLoading &&
          !!filterOptions.length &&
          filterOptions?.map((option) => {
            return (
              <TableHeaderFilterDropdownOptionItem
                key={option.id || option.code || option.uuid}
                filterBy={filterBy}
                isSingleSelection={isSingleSelection}
                option={option}
                selectedFilters={selectedFilters}
                onChange={handleChangeSelectedFilter}
              />
            );
          })}
        {!isLoading && !filterOptions.length && <div>{t("nothingHere")}</div>}
        {isLoading && <TableHeaderFilterDropdownSkeleton isSingleSelection={isSingleSelection} />}
      </div>
      <div className="mt-2.5 border-t-2 border-gray-100">
        {isLoading ? (
          <LoadingSkeleton className="my-3 h-4 w-full" />
        ) : (
          <button
            type="button"
            className="pb-2 pt-1.5 text-left font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            onClick={onClearSelectedFilters}
          >
            {t("clearSelection")}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(TableHeaderFilterDropdown);
