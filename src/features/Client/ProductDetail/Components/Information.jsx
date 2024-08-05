import { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { beautifyNumber } from "@utils/Helpers";
import useToast from "@hooks/useToast";
import { addItem } from "@slices/commonSlice";
import { Button, InputQuantity } from "@common/Components";
import { useTranslation } from "react-i18next";
import ProductDetailDescription from "./Description";

const ProductDetailInformation = ({ product }) => {
  const { t } = useTranslation();

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

  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="flex items-end justify-between space-x-4">
          <div className="text-3xl font-semibold">{product?.name}</div>
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

        <Button size="sm" className="text-sm" onClick={handleAddCart}>
          {t("addCart")}
        </Button>
      </div>
      <ProductDetailDescription description={product.information} />
    </div>
  );
};

export default memo(ProductDetailInformation);
