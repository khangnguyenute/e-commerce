import { memo } from "react";
import { twMerge } from "tailwind-merge";

const classNamesByStatus = {
  processing: "border-orange-500 text-orange-500",
  packed: "border-blue-500 text-blue-500",
  inTransit: "border-gray-500 text-gray-500",
  delivered: "border-green-500 text-green-500",
  canceled: "border-red-500 text-red-500",
};

const sizeStatus = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1",
  xl: "text-xl px-3 py-2",
};

const OrderStatus = ({ status = "processing", size = "sm", className }) => {
  return (
    <div
      className={twMerge(
        "mx-auto w-fit rounded-full border-2 text-center",
        classNamesByStatus[status],
        sizeStatus[size],
        className,
      )}
    >
      {status}
    </div>
  );
};
export default memo(OrderStatus);
