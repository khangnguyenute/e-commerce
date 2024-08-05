import { memo, useCallback, useLayoutEffect, useMemo } from "react";
import { Carousel } from "@common/Components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { userService } from "@services/index";
import { MdOutlineFavorite } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import useToast from "@hooks/useToast";

const ProductDetailGallery = ({ product }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const user = useSelector((state) => state.common.user);
  const [isFavorited, setIsFavorited] = useState(false);

  const gallery = useMemo(() => [product.image, ...product.gallery], [product]);

  const checkFavoriteProduct = useCallback(
    () => user?.favoriteProducts.some((item) => item._id === product?._id),
    [product?._id, user?.favoriteProducts],
  );

  const handleClickFavorite = useCallback(() => {
    if (!user) {
      toast.warning(t("doNotLogIn"));
      return;
    }

    userService.addFavoriteProduct({
      _id: user._id,
      productId: product._id,
    });

    if (checkFavoriteProduct()) {
      toast.success(t("deleteFavoriteSuccessfully"));
      setIsFavorited(false);
      return;
    }
    toast.success(t("addFavoriteSuccessfully"));
    setIsFavorited(true);
  }, [checkFavoriteProduct, product._id, t, toast, user]);

  useLayoutEffect(() => {
    setIsFavorited(checkFavoriteProduct());
  }, [checkFavoriteProduct]);

  return (
    <div className="relative border p-4">
      <div role="button" tabIndex={0} className="absolute right-4 top-4 z-10" onClick={handleClickFavorite}>
        <MdOutlineFavorite
          className={twMerge("text-gray-300", isFavorited && "text-primary-500")}
          size={24}
        />
      </div>
      <Carousel
        gallery={gallery}
        isThumbs
        contentClassName="mb-4 h-96 w-full object-scale-down"
        thumbsClassName="h-20 w-20 object-cover"
      />
    </div>
  );
};

export default memo(ProductDetailGallery);
