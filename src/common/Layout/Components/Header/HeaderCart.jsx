import useCart from "@hooks/useCart";
import { memo } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const HeaderCart = () => {
  const { totalQuantity } = useCart();

  return (
    <div className="relative ml-2">
      <div className="absolute left-0 top-1 flex h-4 w-4 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-yellow-200">
        <span className="text-xs text-gray-600">{totalQuantity}</span>
      </div>
      <AiOutlineShoppingCart size={24} />
    </div>
  );
};

export default memo(HeaderCart);
