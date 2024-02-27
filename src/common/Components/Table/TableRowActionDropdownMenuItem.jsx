import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

const TableRowActionDropdownMenuItem = ({ id, item }) => {
  const handleClick = useCallback(() => {
    if (item.isDisabled || !id) {
      return;
    }

    item.onClick(id);
  }, [id, item]);

  return (
    <div
      className={twMerge(
        "flex items-center justify-start px-4 py-1.5 hover:bg-gray-100",
        item.className,
        item.isDisabled && "cursor-not-allowed text-gray-400 opacity-50 hover:bg-gray-100",
      )}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="mr-3">{item.icon}</div>
      <div className="line-clamp-1 break-all">{item.label}</div>
    </div>
  );
};

export default memo(TableRowActionDropdownMenuItem);
