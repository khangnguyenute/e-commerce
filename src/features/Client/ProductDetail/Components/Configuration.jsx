import { memo } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const ProductDetailConfiguration = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-2 text-xl font-bold text-gray-800">{t("configuration", { name: product.name })}</div>
      {product.parameter &&
        Object.entries(product.parameter).map((param, index) => {
          return (
            <div className={twMerge("grid grid-cols-3", index % 2 === 0 && "bg-gray-100")} key={index}>
              <div className="col-span-1 p-4">{t(param[0])}</div>
              <div className="col-span-2 p-4">{param[1]}</div>
            </div>
          );
        })}
    </div>
  );
};

export default memo(ProductDetailConfiguration);
