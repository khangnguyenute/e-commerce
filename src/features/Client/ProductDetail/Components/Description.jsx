import { useTranslation } from "react-i18next";
import { TbBrandDaysCounter, TbShieldCheckFilled, TbTruckDelivery } from "react-icons/tb";
import ProductDetailDescriptionItem from "./DescriptionItem";
import { memo } from "react";

const ProductDetailDescription = ({ description }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-2">
        <ProductDetailDescriptionItem
          icon={<TbBrandDaysCounter size={20} />}
          content={t("expressDelivery")}
          detail={t("seeDetails")}
        />
        <ProductDetailDescriptionItem
          icon={<TbShieldCheckFilled size={20} />}
          content={t("warrantyCenters")}
          detail={t("seeWarrantyAddress")}
        />
        <ProductDetailDescriptionItem
          icon={<TbTruckDelivery size={20} />}
          content={t("expressDelivery")}
          detail={t("learnAbout")}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <div className="text-xl font-bold">{t("description")}</div>
        <div className="text-slate-700">{description}</div>
      </div>
    </>
  );
};

export default memo(ProductDetailDescription);
