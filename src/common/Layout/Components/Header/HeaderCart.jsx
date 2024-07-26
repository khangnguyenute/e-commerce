import { CLIENT_PATH } from "@constants/routeConstant";
import useCart from "@hooks/useCart";
import { memo, useCallback } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const HeaderCart = () => {
  const navigate = useNavigate();

  const { totalQuantity } = useCart();

  const handleClickCart = useCallback(() => {
    navigate(CLIENT_PATH.CART);
  }, [navigate]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="relative text-blue-500 hover:text-blue-700"
      onClick={handleClickCart}
    >
      <div className="absolute left-0 top-1 h-4 w-4 -translate-y-1/2 translate-x-4 rounded-full bg-yellow-200 text-center leading-4">
        <span className="text-xs text-gray-600">{totalQuantity}</span>
      </div>
      <AiOutlineShoppingCart size={24} />
    </div>
  );
};

export default memo(HeaderCart);
