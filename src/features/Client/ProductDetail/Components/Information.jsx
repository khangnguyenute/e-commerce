import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { beautifyNumber } from "@utils/Helpers";
import useToast from "@hooks/useToast";
import { addItem } from "@slices/commonSlice";
import { Button, InputQuantity } from "@common/Components";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import { userService } from "@services/index";
import { AiFillLike } from "react-icons/ai";

const ProductDetailInformation = ({ product }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.common.user);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const handleAddCart = useCallback(() => {
    dispatch(addItem({ ...product, quantity: quantity }));
    setQuantity(1);

    toast.success(t("addCartSuccessfully"));
    navigate("/cart");
  }, [dispatch, navigate, product, quantity, t, toast]);

  const handleClickFavorite = useCallback(() => {
    if (!user) {
      toast.warning(t("doNotLogIn"));
      return;
    }

    userService.addFavoriteProduct({
      _id: user._id,
      productId: product._id,
    });

    if (user.favoriteProducts.some((favoriteProduct) => favoriteProduct._id === product._id)) {
      toast.success(t("deleteFavoriteSuccessfully"));
      return;
    }
    toast.success(t("addFavoriteSuccessfully"));
  }, [product._id, t, toast, user]);

  const checkFavoriteProduct = useCallback(() => {
    if (user?.favoriteProducts.some((item) => item._id === product?._id)) {
      return (
        <>
          <AiFillLike className="mr-2" /> {t("liked")}
        </>
      );
    }
    return t("like");
  }, [product?._id, t, user?.favoriteProducts]);

  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between space-x-4">
          <div className="text-3xl font-semibold">{product?.name}</div>
          <div
            role="button"
            tabIndex={0}
            className={twMerge(
              "flex h-fit rounded bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700",
            )}
            onClick={handleClickFavorite}
          >
            {checkFavoriteProduct()}
          </div>
        </div>

        <div className="flex items-center">
          <span className="block w-28">{t("price")}:</span>
          <div className="space-x-4">
            <span className="text-xl font-semibold text-primary-600">
              {beautifyNumber(Math.round(product?.price * (1 - parseFloat(product?.discount))))}₫
            </span>
            {Boolean(product?.discount) && (
              <>
                <i className="text-gray-600 line-through">{beautifyNumber(product?.price)}₫</i>
                <span className="text-primary-600">(-{product?.discount * 100}%)</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <span className="block w-28">{t("quantity")}:</span>
          <InputQuantity
            name="quantity"
            size="xs"
            value={1}
            min={1}
            max={10}
            className="w-20"
            onChange={setQuantity}
          />
        </div>
      </div>
      <Button size="sm" className="text-sm" onClick={handleAddCart}>
        {t("addCart")}
      </Button>
    </>
  );
};

export default memo(ProductDetailInformation);
