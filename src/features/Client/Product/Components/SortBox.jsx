import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

const ProductContainerSortBox = ({ sortParams, item, onSort }) => {
  const handleSort = useCallback(() => {
    if (sortParams?.label === item.label) {
      onSort(null);
      return;
    }
    onSort(item);
  }, [sortParams, item, onSort]);

  return (
    <div
      role="button"
      tabIndex={0}
      className={twMerge(
        "h-10 rounded-full border-2 px-5 py-2 text-sm hover:border-2 hover:border-blue-500 hover:text-blue-700",
        sortParams?.label === item.label && "border-2 border-blue-500 text-blue-700",
      )}
      onClick={handleSort}
    >
      {item.label}
    </div>
  );
};
export default memo(ProductContainerSortBox);
