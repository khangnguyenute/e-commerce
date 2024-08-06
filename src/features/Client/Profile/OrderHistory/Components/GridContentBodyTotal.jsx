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
      <p className="font-semibold">
        {t("totalQuantity")}: <span className="text-primary-500">{totalQuantity}</span>
      </p>
      <p className="font-semibold">
        {t("totalPrice")}: <span className="text-primary-500">{totalPrice}</span>
      </p>
    </div>
  );
};
export default memo(ProfileOrderHistoryGridContentBodyTotal);
