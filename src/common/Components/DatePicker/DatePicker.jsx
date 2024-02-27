import { memo, useCallback, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";

import DatePickerContainer from "./DatePickerContainer";

const DatePicker = ({
  name,
  type,
  selectedRangeDate,
  minDate,
  maxDate,
  monthsShown,
  onChange,
}) => {
  const [rangeDate, setRangeDate] = useState(selectedRangeDate);

  const selectedDate = useMemo(() => {
    if (!rangeDate) {
      return null;
    }
    if (rangeDate instanceof Date) {
      return rangeDate;
    }
    return rangeDate[0];
  }, [rangeDate]);

  const handleOnChange = useCallback(
    (range) => {
      setRangeDate(range);
      if (range instanceof Date) {
        onChange(range);
        return;
      }

      if (!range[0] || !range[1]) {
        return;
      }

      onChange(range);
    },
    [onChange]
  );

  return (
    <ReactDatePicker
      name={name}
      selected={selectedDate}
      calendarContainer={DatePickerContainer}
      onChange={handleOnChange}
      {...(type === "rangeDate" && {
        startDate: rangeDate?.[0],
        endDate: rangeDate?.[1],
        selectsRange: true,
        monthsShown,
      })}
      minDate={minDate}
      maxDate={maxDate}
      inline
      disabledKeyboardNavigation
    />
  );
};

export default memo(DatePicker);
