import { isEmpty } from "lodash";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { useOnClickOutside } from "usehooks-ts";

import DatePicker from "./DatePicker";
import DatePickerSelectRange from "./DatePickerSelectRange";
import { calculateDatePickerRange, getTwScreenWidth } from "../Utils";

const DatePickerDropdown = ({
  containerRef,
  type,
  isForceShowEntireDatePicker = false,
  selectedRangeDate,
  isShowClearSelected,
  minDate,
  maxDate,
  className,
  onClearSelectedRangeDate,
  onChangeRangeDate,
  onHide,
}) => {
  const { t } = useTranslation();

  const dropdownRef = useRef(null);

  const [isShowRangeDate, setIsShowRangeDate] = useState(true);
  const [monthsShown, setMonthsShown] = useState(1);

  const rangeList = useMemo(
    () => [
      { name: "today", label: t("today") },
      { name: "yesterday", label: t("yesterday") },
      { name: "last7Days", label: t("last7Days") },
      { name: "last30Days", label: t("last30Days") },
      { name: "thisMonth", label: t("thisMonth") },
      { name: "lastMonth", label: t("lastMonth") },
      { name: "custom", label: t("custom") },
    ],
    [t],
  );

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleSelected = useCallback(
    (selectedItem) => {
      if (selectedItem.name === "customeRange") {
        setIsShowRangeDate(true);
        return;
      }

      const { start, end } = calculateDatePickerRange(selectedItem);
      onChangeRangeDate([start, end]);
    },
    [onChangeRangeDate],
  );

  const setDropdownPosition = useCallback(() => {
    const containerElement = containerRef.current;
    const dropdownElement = dropdownRef.current;
    const space = 8;
    if (!containerElement || !dropdownElement) {
      return;
    }
    const containerElementRect = containerElement.getBoundingClientRect();
    const windowWidth = window.document.documentElement.clientWidth;
    const padding = windowWidth > getTwScreenWidth("md") ? 32 : 16;

    const overflowHeight =
      window.innerHeight - containerElementRect.top - Number(containerElement.offsetHeight) - space;
    if (
      overflowHeight < dropdownElement.offsetHeight &&
      containerElementRect.top > dropdownElement.offsetHeight
    ) {
      dropdownElement.style.top = `${-dropdownElement.offsetHeight - space}px`;
    } else {
      dropdownElement.style.top = `${Number(containerElement.offsetHeight) + space}px`;
    }

    if (windowWidth - containerElementRect.left > dropdownElement.offsetWidth) {
      dropdownElement.style.left = "0px";
      return;
    }
    if (containerElementRect.left > dropdownElement.offsetWidth) {
      dropdownElement.style.left = `${-dropdownElement.offsetWidth + containerElementRect.width}px`;
      return;
    }

    dropdownElement.style.left = `${
      windowWidth - containerElementRect.left - dropdownElement.offsetWidth * padding
    }px`;
  }, [containerRef]);

  const calculateMonthsShown = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= getTwScreenWidth("sm")) {
      setMonthsShown(2);
      return;
    }
    setMonthsShown(1);
  }, []);

  useEffect(() => {
    setDropdownPosition();
  }, [setDropdownPosition, isShowRangeDate, monthsShown]);

  useLayoutEffect(() => {
    calculateMonthsShown();

    if (!isEmpty(selectedRangeDate) || isForceShowEntireDatePicker) {
      setIsShowRangeDate(true);
      return;
    }
    setIsShowRangeDate(false);
  }, [calculateMonthsShown, isForceShowEntireDatePicker, selectedRangeDate]);

  useOnClickOutside(dropdownRef, onHide);

  return (
    <div
      role="button"
      tabIndex={0}
      ref={dropdownRef}
      className={twMerge(
        "absolute top-12 z-40 flex flex-col overflow-hidden rounded-lg bg-white text-slate-700 shadow-base",
        className,
      )}
      onMouseDown={handleMouseDown}
    >
      <div className={twMerge("relative pb-2.5 pl-3 pr-2 pt-2 md:px-4", !isShowRangeDate && "px-4")}>
        <div className="-mx-4 flex">
          {type === "rangeDate" && (
            <div
              className={twMerge("relative w-32 border-gray-100 py-1.5 md:w-36", !isShowRangeDate && "w-36")}
            >
              {rangeList.map((selectedItem) => (
                <DatePickerSelectRange
                  key={selectedItem.name}
                  selectedItem={selectedItem}
                  onSelected={handleSelected}
                />
              ))}
            </div>
          )}
          {isShowRangeDate && (
            <DatePicker
              type={type}
              selectedRangeDate={selectedRangeDate}
              onChange={onChangeRangeDate}
              name="datePicker"
              minDate={minDate}
              maxDate={maxDate}
              monthsShown={monthsShown}
            />
          )}
        </div>
      </div>
      {isShowClearSelected && (
        <div className="border-t-2 border-gray-100 px-4">
          <button
            type="button"
            className="pb-2 pt-1.5 text-left font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onClearSelectedRangeDate}
          >
            {t("clearSelection")}
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(DatePickerDropdown);
