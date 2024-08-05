import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OrderInformation from "./OrderInformation";
import OrderPaymentMethod from "./OrderPaymentMethod";
import { memo } from "react";

const Order = () => {
  const { t } = useTranslation();

  const order = useSelector((state) => state.common.order);

  if (!order) {
    return <Navigate to="/cart" />;
  }

  return (
    <div className="max-w-160 mx-auto my-8 flex flex-col space-y-6 rounded-lg border p-6 shadow-md">
      <div className="text-center">
        <div className="text-xl font-semibold">{t("orderConfirmation")}</div>
        <div>{t("orderMessage")}</div>
      </div>

      <OrderInformation order={order} />
      <OrderPaymentMethod order={order} />
    </div>
  );
};

export default memo(Order);
