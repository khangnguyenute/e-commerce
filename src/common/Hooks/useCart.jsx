import { useSelector } from "react-redux";

const useCart = () => {
  const cartData = useSelector((state) => state.common.cart);
  const totalPrice = cartData.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.price - item.price * item.discount),
    0,
  );
  const totalQuantity = cartData.reduce((total, item) => total + Number(item.quantity), 0);

  return { cartData, totalPrice, totalQuantity };
};

export default useCart;
