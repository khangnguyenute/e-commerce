import { memo, useCallback, useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

const TableRowAction = ({
  id,
  isDisabled,
  children,
  status = "normal",
  title,
  onClick,
}) => {
  const tooltipId = useMemo(
    () => `table-row-action-tooltip-${Math.random()}`,
    []
  );

  const handleClick = useCallback(() => {
    if (isDisabled || !id) {
      return;
    }

    onClick?.(id);
  }, [id, isDisabled, onClick]);

  return (
    <div
      className={twMerge(
        "group flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 !shadow-gray-400 duration-100 hover:bg-gray-200 active:shadow-inside",
        status === "danger" && "bg-red-50 text-red-500 hover:bg-red-100",
        status === "success" && "bg-green-50 text-green-500 hover:bg-green-100",
        isDisabled &&
          "cursor-not-allowed text-gray-400 opacity-50 hover:bg-gray-100",
        isDisabled && status === "danger" && "text-red-300 hover:bg-red-50",
        isDisabled && status === "danger" && "text-green-300 hover:bg-green-50"
      )}
      data-tooltip-id={tooltipId}
      data-tooltip-position-strategy="fixed"
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      {children}
      {title && (
        <Tooltip
          id={tooltipId}
          content={title}
          place="top"
          positionStrategy="absolute"
        />
      )}
    </div>
  );
};

export default memo(TableRowAction);
