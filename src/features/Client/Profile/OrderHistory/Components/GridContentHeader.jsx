import useToast from "@hooks/useToast";
import { orderService } from "@services/index";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const ProfileOrderHistoryGridContentHeader = ({ order, onClickBack }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const isAllowedCancellation = useMemo(
    () => order.status === "processing" || order.status === "packed",
    [order.status],
  );

  const handleCancelOrder = useCallback(
    async (orderId) => {
      try {
        await orderService.updateOrderById(orderId, { status: "cancel" });

        toast.success(t("cancelOrderSuccessfully"));
        onClickBack("cancel");
      } catch (error) {
        toast.error(t("unknown"));
      }
    },
    [onClickBack, t, toast],
  );

  return (
    <div>
      <div className="flex justify-between font-semibold">
        <div className="font-semibold">
          <span>{t("orderId")}: </span>
          <span className="text-blue-500">{order._id}</span>
        </div>

        {isAllowedCancellation && (
          <div
            role="button"
            tabIndex={0}
            className="text-primary-500 hover:text-primary-700"
            id={order._id}
            onClick={handleCancelOrder}
          >
            {t("cancel")}
          </div>
        )}
      </div>

      <div className="font-semibold">
        <span>{t("status")}: </span>
        <span className="text-blue-500">{t(order.status)}</span>
      </div>
    </div>
  );
};
export default memo(ProfileOrderHistoryGridContentHeader);
