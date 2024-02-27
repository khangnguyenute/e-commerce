import { DiscountEnum } from "@constants/enumConstant";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const ProductDetailPromotion = () => {
  const { t } = useTranslation();

  return (
    <div className="border border-gray-400">
      <div className="border-b border-gray-400 bg-gray-100 px-4 py-2 text-lg font-bold">{t("promotion")}</div>
      <div className="flex flex-col space-y-2 p-4">
        {Object.values(DiscountEnum).map((discount, index) => {
          return (
            <div key={index}>
              <span className="mr-3 inline-block h-6 w-6 rounded-full bg-blue-500 text-center text-sm font-semibold leading-6 text-white">
                {index + 1}
              </span>
              <span>{t(discount)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ProductDetailPromotion);
