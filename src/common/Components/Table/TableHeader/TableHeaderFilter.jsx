import { flexRender } from "@tanstack/react-table";
import dayjs from "dayjs";
import { first, get, isEmpty, isEqual } from "lodash";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import TableHeaderFilterDropdown from "./TableHeaderFilterDropdown";
import TableHeaderFilterLabel from "./TableHeaderFilterLabel";
import useTableFilter from "@hooks/useTableFilter";
import { DatePickerDropdown } from "@common/Components/DatePicker";

const TableHeaderFilter = ({ id, header, className, onChangeFilters }, ref) => {
  const { t } = useTranslation();

  const headerColumnDef = header.column.columnDef;

  const filterBy = useMemo(() => {
    const originalFilterBy = headerColumnDef.meta?.filterBy ?? headerColumnDef.id;
    return (Array.isArray(originalFilterBy) ? first(originalFilterBy) : originalFilterBy) ?? "";
  }, [headerColumnDef]);

  const [searchValueParam] = useTableFilter(filterBy, headerColumnDef.meta?.filterType);

  const isFirstRenderRef = useRef(true);
  const filterOptionLabelFactory = useMemo(
    () => headerColumnDef.meta?.filterOptionLabelFactory ?? ((option) => option),
    [headerColumnDef.meta?.filterOptionLabelFactory],
  );

  const filterValueBy = useMemo(
    () => headerColumnDef.meta?.filterValueBy ?? filterBy,
    [filterBy, headerColumnDef.meta?.filterValueBy],
  );

  const [filterOptions, setFilterOptions] = useState([]);
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const [queryParams, setQueryParams] = useState({
    filterBy,
    filterValue: "",
  });

  const filterType = useMemo(() => headerColumnDef.meta?.filterType, [headerColumnDef]);

  const containerRef = useRef(null);

  const rawGetFilterOptions = useMemo(() => headerColumnDef.meta?.getFilterOptions, [headerColumnDef]);

  const formatFilterOptions = useCallback(
    (options) => {
      return options
        .map((option) => {
          let filterValue = "";
          const result = {
            id:
              option.id || option._id || option.uuid || option.value || option.name || option.label || option,
            label: null,
            value: "",
          };

          filterValue = get(option, filterValueBy);

          if (filterValue === undefined || filterValue === null) {
            return null;
          }

          result.value = filterValue;
          result.label = filterOptionLabelFactory(option);

          return result;
        })
        .filter(Boolean);
    },
    [filterOptionLabelFactory, filterValueBy],
  );

  const formatFilterBy = useCallback(
    (filterParam) => {
      if (!id) {
        return `filter.${filterParam}`;
      }

      return `filter_${id}.${filterParam}`;
    },
    [id],
  );

  const getFilterOptions = useCallback(
    async (query) => {
      if (headerColumnDef.meta?.filterType === "rangeDate") {
        return;
      }

      setIsLoading(true);

      try {
        const options = await rawGetFilterOptions?.(query);

        if (!options) {
          return;
        }

        if ("data" in options) {
          setFilterOptions(formatFilterOptions(options.data));
          return;
        }

        if (Array.isArray(options)) {
          setFilterOptions(formatFilterOptions(options));
        }
      } catch (error) {
        setFilterOptions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [formatFilterOptions, headerColumnDef.meta?.filterType, rawGetFilterOptions],
  );

  const handleShowDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(true);
  }, []);

  const handleCloseDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(false);
  }, []);

  const handleChangeFilters = useCallback(
    (filters) => {
      if (filters instanceof Date) {
        return;
      }

      setSelectedFilters(filters);

      if (filterType === "rangeDate") {
        onChangeFilters?.(
          [formatFilterBy(`${filterBy}.from`), formatFilterBy(`${filterBy}.to`)],
          [dayjs(filters[0]).format(t("dateFormat")), dayjs(filters[1]).format(t("dateFormat"))],
        );
        setIsShowDropdownMenu(false);
        return;
      }

      onChangeFilters?.(formatFilterBy(`${filterBy}`), filters);
    },
    [filterBy, filterType, formatFilterBy, onChangeFilters, t],
  );

  const handleClearFilters = useCallback(() => {
    setSelectedFilters([]);
    handleCloseDropdownMenu();
    if (filterType === "rangeDate") {
      onChangeFilters?.([formatFilterBy(`${filterBy}.from`), formatFilterBy(`${filterBy}.to`)], []);
      return;
    }

    onChangeFilters?.(formatFilterBy(`${filterBy}`), []);
  }, [filterBy, filterType, formatFilterBy, handleCloseDropdownMenu, onChangeFilters]);

  const handleClickClearAll = useCallback(() => {
    setSelectedFilters([]);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onClickClearAll: handleClickClearAll,
    }),
    [handleClickClearAll],
  );

  const label = useMemo(() => {
    const originalLabel =
      headerColumnDef.meta?.filterLabel ?? flexRender(headerColumnDef.header, header.getContext());

    return (
      <TableHeaderFilterLabel
        label={originalLabel}
        options={filterOptions}
        selected={selectedFilters}
        filterType={filterType}
      />
    );
  }, [
    filterOptions,
    filterType,
    header,
    headerColumnDef.header,
    headerColumnDef.meta?.filterLabel,
    selectedFilters,
  ]);

  useEffect(() => {
    if ((isShowDropdownMenu || searchValueParam.length) && filterOptions.length === 0) {
      getFilterOptions();
    }
  }, [filterOptions.length, getFilterOptions, isShowDropdownMenu, searchValueParam]);

  useEffect(() => {
    const newQueryParams = {
      filterBy,
      filterValue: filterSearchValue,
    };
    if (isEqual(newQueryParams, queryParams)) {
      return;
    }
    setQueryParams(newQueryParams);
    getFilterOptions(newQueryParams);
  }, [filterBy, filterSearchValue, getFilterOptions, queryParams]);

  useEffect(() => {
    if ((!searchValueParam.length && !isFirstRenderRef.current) || id) {
      return;
    }

    isFirstRenderRef.current = false;
    setSelectedFilters(searchValueParam);
  }, [id, searchValueParam]);

  return (
    <div className={twMerge("relative mb-4 mr-4 h-10 rounded-lg last:mr-0", className)} ref={containerRef}>
      <div
        className={twMerge(
          "z-20 flex h-full w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-gray-100 bg-gray-50 pl-4 pr-2.5 duration-200 hover:border-gray-200 hover:bg-gray-100",
          isShowDropdownMenu && "border-gray-200 bg-gray-100",
          !isEmpty(selectedFilters) && "border-blue-500 bg-blue-50 hover:border-blue-500 hover:bg-blue-50",
        )}
        role="button"
        tabIndex={0}
        onClick={handleShowDropdownMenu}
      >
        <div>{label}</div>
        <BiChevronDown size={20} />
      </div>
      {isShowDropdownMenu &&
        (filterType === "rangeDate" ? (
          <DatePickerDropdown
            name="table-header-date-picker"
            containerRef={containerRef}
            selectedRangeDate={selectedFilters}
            isShowClearSelected
            onChangeRangeDate={handleChangeFilters}
            isLoading={isLoading}
            type={"rangeDate"}
            onClearSelectedRangeDate={handleClearFilters}
            onHide={handleCloseDropdownMenu}
          />
        ) : (
          <TableHeaderFilterDropdown
            isShowDropdownMenu={isShowDropdownMenu}
            filterBy={filterBy}
            filterType={filterType}
            filterOptions={filterOptions}
            isSingleSelection={headerColumnDef.meta?.isSingleSelection}
            isLoading={isLoading}
            selectedFilters={selectedFilters}
            onChangeFilters={handleChangeFilters}
            onChangeFilterSearchValue={setFilterSearchValue}
            onClearSelectedFilters={handleClearFilters}
            onHide={handleCloseDropdownMenu}
          />
        ))}
    </div>
  );
};

export default memo(forwardRef(TableHeaderFilter));
