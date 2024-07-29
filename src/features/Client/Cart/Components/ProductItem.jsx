import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { memo, useCallback } from "react";
import { lowerCase } from "lodash";
import { beautifyNumber } from "@utils/Helpers";
import { removeItem, updateItem } from "@slices/commonSlice";
import { InputQuantity } from "@common/Components";

const CartProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const removeCartItem = useCallback(() => {
    dispatch(removeItem(product));
  }, [dispatch, product]);

  const updateCartItem = useCallback(
    (quantity) => {
      dispatch(updateItem({ ...product, quantity }));
    },
    [dispatch, product],
  );

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
      <div className="flex items-center gap-4">
        <div className="h-16 max-w-24 flex-1 object-cover">
          <img src={product.image} alt={product.name} className="mx-auto h-full" />
        </div>
        <Link
          to={`/${lowerCase(product.category)}/${product._id}`}
          className="line-clamp-2 flex-1 font-semibold"
        >
          {product.name}
        </Link>
      </div>
      <div className="grid grid-cols-5 items-center justify-items-stretch gap-4">
        <div className="col-span-2 font-medium text-slate-700">
          <p className="mr-2 font-bold text-primary-500">
            {beautifyNumber(product.price * (1 - product.discount))}₫
          </p>
          {Boolean(product.discount) && <p className="line-through">{beautifyNumber(product.price)}₫</p>}
        </div>
        <InputQuantity
          name={`quantity.${product._id}`}
          size="xs"
          value={product.quantity}
          min={1}
          max={10}
          className="col-span-2 w-20"
          onChange={updateCartItem}
        />
        <button className="text-primary-500 duration-300 hover:text-primary-700" onClick={removeCartItem}>
          <AiFillDelete size={24} />
        </button>
      </div>
    </div>
  );
};

export default memo(CartProductItem);
