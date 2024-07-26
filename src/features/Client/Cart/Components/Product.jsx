import { memo } from "react";
import CartProductItem from "./ProductItem";
import { twMerge } from "tailwind-merge";

const CartProduct = ({ cartData, className }) => {
  return (
    <div
      className={twMerge(
        "col-span-3 flex flex-col space-y-6 rounded-xl border bg-white p-6 shadow-base",
        className,
      )}
    >
      {cartData.map((product) => (
        <CartProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default memo(CartProduct);
