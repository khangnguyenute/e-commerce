import { useNavigate } from "react-router-dom";
import { numberFormat } from "@utils/Helpers";
import useToast from "@hooks/useToast";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { CLIENT_PATH, PROFILE_PATH } from "@constants/routeConstant";

const OrderInformation = ({ order }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const navigate = useNavigate();

  const handleNavigateOrderManagement = useCallback(() => {
    navigate(PROFILE_PATH.ORDER_HISTORY_TAB("processing"));
  }, [navigate]);

  const handleCancelOrder = useCallback(() => {
    toast.success(t("cancelOrderSuccessfully"));
    localStorage.removeItem("order");
    navigate(CLIENT_PATH.CART);
  }, [navigate, t, toast]);

  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border bg-blue-50 p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="font-semibold">
          {t("orderId")}: <span className="text-blue-500">#{order._id}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            role="button"
            tabIndex={0}
            onClick={handleNavigateOrderManagement}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          >
            {t("orderManagement")}
          </div>
          <div
            role="button"
            tabIndex={0}
            className="cursor-pointer text-primary-500 hover:text-primary-700"
            onClick={handleCancelOrder}
          >
            {t("cancel")}
          </div>
        </div>
      </div>

      <div>
        <span className="font-semibold">{t("receiver")}: </span>
        <i className="uppercase">{order.fullname}</i>
      </div>
      <div>
        <span className="font-semibold">{t("phone")}: </span>
        <i>{order.phone}</i>
      </div>
      <div>
        <span className="font-semibold">{t("address")}: </span>
        <i>
          {order.address}, {order.ward.name}, {order.district.name}, {order.city.name}
        </i>
      </div>
      <div className="font-semibold">
        <span> {t("total")}: </span>
        <i className="text-red-700">{numberFormat(Number(order.totalPrice))}</i>
      </div>
    </div>
  );
};

export default memo(OrderInformation);
