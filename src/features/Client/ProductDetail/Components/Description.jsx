import { useTranslation } from "react-i18next";
import { TbBrandDaysCounter, TbShieldCheckFilled, TbTruckDelivery } from "react-icons/tb";
import ProductDetailDescriptionItem from "./DescriptionItem";
import { memo } from "react";

const ProductDetailDescription = ({ description }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-6">
      <div className="text-xl font-bold">{t("description")}</div>
      <div className="my-2 text-slate-700">{description}</div>
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
  );
};

export default memo(ProductDetailDescription);
