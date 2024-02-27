import { Checkbox } from "@common/Components/Form";
import { memo, useCallback, useMemo } from "react";

const TableHeaderFilterDropdownOptionItem = ({
  option,
  filterBy,
  isSingleSelection,
  selectedFilters,
  onChange,
}) => {
  const value = useMemo(() => option.value, [option]);
  const id = useMemo(() => option.id, [option]);

  const handleChangeCheckbox = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      onChange(value, isChecked);
    },
    [onChange, value],
  );

  return (
    <label htmlFor={id} className="group flex items-center justify-start space-x-3 py-1">
      <Checkbox
        id={id}
        name={filterBy}
        type={isSingleSelection ? "radio" : "checkbox"}
        checked={selectedFilters.includes(value)}
        className="h-5 w-5 rounded-full"
        onChange={handleChangeCheckbox}
      />
      <span className="max-w-[180px] truncate">{option.label}</span>
    </label>
  );
};

export default memo(TableHeaderFilterDropdownOptionItem);
