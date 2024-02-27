import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

const ProfileOrderHistoryGridContentBodyInformation = ({ order }) => {
  const { t } = useTranslation();

  const status = useMemo(() => (order?.payment?.paid ? t("paid") : t("unpaid")), [order?.payment?.paid, t]);

  return (
    <div className="flex justify-between">
      <div>
        <div className="font-semibold">{t("deliveryAddress")}</div>
        <div>
          <span>{t("address")}: </span>
          <i className="text-slate-500">{order?.address}</i>
        </div>

        <div>
          <span>{t("phone")}: </span>
          <i className="text-slate-500">{order?.phone}</i>
        </div>
      </div>
      <div>
        <div className="font-semibold">{t("paymentMethod")}</div>
        <div>
          <span>{t("by")}: </span>
          <i className="text-slate-500">{t(order?.payment?.name)}</i>
        </div>

        <div>
          <span>{t("paymentStatus")}: </span>
          <i className="text-slate-500">{status}</i>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileOrderHistoryGridContentBodyInformation);
