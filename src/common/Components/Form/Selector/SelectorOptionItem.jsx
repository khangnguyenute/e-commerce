import { Checkbox } from "@common/Components/Form";
import { memo, useCallback, useMemo } from "react";

const SelectorOptionItem = ({ option, name, isSingleSelection, selectedOptions, onChange }) => {
  const value = useMemo(() => option.value, [option]);
  const label = useMemo(() => option.label, [option]);

  const handleChangeCheckbox = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      onChange(value, isChecked);
    },
    [onChange, value],
  );

  return (
    <label htmlFor={value} className="group flex items-center justify-start space-x-3 py-1">
      <Checkbox
        id={value}
        name={name}
        type={isSingleSelection ? "radio" : "checkbox"}
        checked={selectedOptions.includes(value)}
        className="h-5 w-5 rounded-full"
        onChange={handleChangeCheckbox}
      />
      <span className="truncate">{label}</span>
    </label>
  );
};

export default memo(SelectorOptionItem);
