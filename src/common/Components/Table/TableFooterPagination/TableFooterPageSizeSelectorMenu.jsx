import { memo } from "react";

import TableFooterPageSizeSelectorMenuItem from "./TableFooterPageSizeSelectorMenuItem";

const TableFooterPageSizeSelectorMenu = ({ sizes, selected, onChange }) => {
  return (
    <div className="relative z-0 mx-auto inline-flex rounded-md shadow-sm">
      {sizes.map((size) => (
        <TableFooterPageSizeSelectorMenuItem
          key={size}
          isSelected={selected === size}
          size={size}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default memo(TableFooterPageSizeSelectorMenu);
