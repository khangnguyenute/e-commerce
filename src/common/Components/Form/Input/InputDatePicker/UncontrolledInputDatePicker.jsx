import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import UncontrolledInputSkeleton from "../UncontrolledInputSkeleton";
import { DatePickerDropdown } from "@common/Components/DatePicker";

const UncontrolledInputDatePicker = (
  {
    id,
    name,
    value,
    type = "rangeDate",
    error,
    style,
    inlineError = false,
    isShowLabelWhenFocusing = false,
    labelPostfix,
    isRequired,
    minDate,
    maxDate,
    onChange,
    ...props
  },
  ref,
) => {
  const { t } = useTranslation();

  const containerRef = useRef(null);

  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const [isAllowKeyboard, setIsAllowKeyboard] = useState(false);
  const [formatValueToString, setFormatValueToString] = useState("");
  const [isHideOnClick, setIsHideOnClick] = useState(false);

  const targetElementInput = useMemo(() => document.getElementById(name), [name]);

  const convertValueToDate = useMemo(() => {
    if (!value) {
      return null;
    }

    if (type === "singleDate") {
      return dayjs(String(value)).toDate();
    }

    if (isEmpty(value)) {
      return null;
    }

    return [dayjs(value[0]).toDate(), dayjs(value[1]).toDate()];
  }, [type, value]);

  const handleShowDropdownMenu = useCallback(() => {
    if (isHideOnClick) {
      setIsHideOnClick(false);
      return;
    }

    setIsShowDropdownMenu(true);
  }, [isHideOnClick]);

  const handleCloseDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(false);
  }, []);

  const handleBlur = useCallback(() => {
    if (containerRef.current === null) {
      return;
    }

    setIsAllowKeyboard(false);
    setIsShowDropdownMenu(false);

    const valueInput = document.getElementById(name)?.value || "";
    if (!valueInput) {
      onChange?.(null);
      return;
    }

    if (type === "singleDate") {
      if (dayjs(valueInput).isValid()) {
        onChange?.(dayjs(valueInput).toDate());
        return;
      }
      onChange?.(dayjs(new Date()).toDate());
      return;
    }

    const rangeDate = valueInput.split("-");
    const [fromDate, toDate] = dayjs(rangeDate[0]?.trim()).isBefore(dayjs(rangeDate[1]?.trim()))
      ? [rangeDate[0]?.trim(), rangeDate[1]?.trim()]
      : [rangeDate[1]?.trim(), rangeDate[0]?.trim()];

    if (dayjs(fromDate).isValid() && dayjs(toDate).isValid()) {
      onChange?.([dayjs(fromDate).toDate(), dayjs(toDate).toDate()]);
      return;
    }
    onChange?.([dayjs(new Date()).toDate(), dayjs(new Date()).toDate()]);
  }, [name, onChange, type]);

  const handleOnChangeRangeDate = useCallback(
    (rangeDate) => {
      onChange?.(rangeDate);
      setIsShowDropdownMenu(false);
      setIsHideOnClick(true);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(() => {
    setIsAllowKeyboard(true);
    setIsShowDropdownMenu(false);
  }, []);

  const handleChangeValue = useCallback((e) => {
    setFormatValueToString(e.target.value);
  }, []);

  useEffect(() => {
    if (!convertValueToDate) {
      setFormatValueToString("");
      return;
    }
    if (convertValueToDate instanceof Date) {
      setFormatValueToString(dayjs(convertValueToDate).format(t("dateFormat")));
      return;
    }
    setFormatValueToString(
      dayjs(convertValueToDate[0])
        .format(t("dateFormat"))
        .concat(" - ", dayjs(convertValueToDate[1]).format(t("dateFormat"))),
    );
  }, [convertValueToDate, t]);

  useEffect(() => {
    if (isShowDropdownMenu || isAllowKeyboard) {
      return;
    }
    targetElementInput?.blur();
  }, [isAllowKeyboard, isShowDropdownMenu, targetElementInput]);

  return (
    <div ref={containerRef}>
      <UncontrolledInputSkeleton
        id={name}
        value={formatValueToString}
        error={error}
        style={style}
        inlineError={inlineError}
        isShowLabelWhenFocusing={isShowLabelWhenFocusing}
        isRequired={isRequired}
        isAvailableValue={Boolean(formatValueToString)}
        isDatePicker
        readOnly={!isAllowKeyboard}
        onKeyDown={handleKeyDown}
        onChange={handleChangeValue}
        onClick={handleShowDropdownMenu}
        onBlur={handleBlur}
        ref={ref}
        {...props}
      >
        {isShowDropdownMenu && (
          <DatePickerDropdown
            name={name}
            containerRef={containerRef}
            type={type}
            selectedRangeDate={convertValueToDate}
            isForceShowEntireDatePicker
            minDate={minDate}
            maxDate={maxDate}
            className="-ml-0.5"
            onChangeRangeDate={handleOnChangeRangeDate}
            onHide={handleCloseDropdownMenu}
          />
        )}
      </UncontrolledInputSkeleton>
    </div>
  );
};

export default memo(forwardRef(UncontrolledInputDatePicker));
