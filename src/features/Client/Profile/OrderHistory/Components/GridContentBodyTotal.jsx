import { memo, useMemo } from "react";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

const ProfileOrderHistoryGridContentBodyTotal = ({ order }) => {
  const { t } = useTranslation();

  const totalQuantity = useMemo(() => {
    if (!order.orderItems || isEmpty(order.orderItems)) {
      return 0;
    }

    return order.orderItems.reduce((sum, current) => sum + current.quantity, 0);
  }, [order]);

  const totalPrice = useMemo(() => {
    if (!order.orderItems || isEmpty(order.orderItems)) {
      return 0;
    }

    return order.orderItems.reduce(
      (sum, { price, discount, quantity }) => sum + Number(price) * (1 - Number(discount)) * quantity,
      0,
    );
  }, [order]);

  return (
    <div>
      <div className="flex space-x-2 font-semibold">
        <div>{t("totalQuantity")}:</div> <div className="text-primary-700">{totalQuantity}</div>
      </div>
      <div className="flex space-x-2 font-semibold">
        <div>{t("totalPrice")}:</div> <div className="text-primary-700">{totalPrice}</div>
      </div>
    </div>
  );
};
export default memo(ProfileOrderHistoryGridContentBodyTotal);
