import { DropdownItem } from "@common/Components/Dropdown";
import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

const TableFooterPageSizeSelectorMenuItem = ({ isSelected, size, onChange }) => {
  const handleChange = useCallback(() => {
    if (isSelected) return;
    onChange(size);
  }, [isSelected, onChange, size]);

  return (
    <DropdownItem
      text={String(size)}
      className={twMerge("justify-center", isSelected && "bg-gray-100")}
      onClick={handleChange}
    />
  );
};

export default memo(TableFooterPageSizeSelectorMenuItem);
