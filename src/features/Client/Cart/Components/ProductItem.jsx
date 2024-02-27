import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { memo, useCallback } from "react";
import { lowerCase } from "lodash";
import { beautifyNumber } from "@utils/Helpers";
import { removeItem, updateItem } from "@slices/commonSlice";
import { Avatar, InputQuantity } from "@common/Components";

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
    <div className="flex items-center space-x-4 text-base">
      <div className="w-24 flex-none">
        <Avatar
          src={product.image}
          alt={product.name}
          className="mx-auto h-16 w-fit rounded-lg border-none"
        />
      </div>
      <Link to={`/${lowerCase(product.category)}/${product._id}`} className="grow font-semibold">
        {product.name}
      </Link>
      <div className="w-24 flex-none">
        <p className="text-primary-500">{beautifyNumber(product.price * (1 - product.discount))}₫</p>
        <p className="line-through">{beautifyNumber(product.price)}₫</p>
      </div>
      <InputQuantity
        name={`quantity.${product._id}`}
        size="sm"
        value={product.quantity}
        min={1}
        max={10}
        className="w-28"
        onChange={updateCartItem}
      />
      <div className="w-32 flex-none text-right font-semibold text-primary-500">
        {beautifyNumber(product.price * (1 - product.discount) * product.quantity)}₫
      </div>
      <button className="text-primary-700" onClick={removeCartItem}>
        <AiFillDelete size={24} />
      </button>
    </div>
  );
};

export default memo(CartProductItem);
