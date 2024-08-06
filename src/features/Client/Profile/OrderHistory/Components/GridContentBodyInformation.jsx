import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

const ProfileOrderHistoryGridContentBodyInformation = ({ order }) => {
  const { t } = useTranslation();

  const status = useMemo(() => (order?.payment?.paid ? t("paid") : t("unpaid")), [order?.payment?.paid, t]);

  return (
    <div className="flex justify-between space-x-2">
      <div>
        <h4 className="font-semibold">{t("deliveryAddress")}</h4>
        <p>
          {t("address")}:<i className="ml-2 text-slate-500">{order?.address}</i>
        </p>
        <p>
          {t("phone")}:<i className="ml-2 text-slate-500">{order?.phone}</i>
        </p>
      </div>
      <div>
        <h4 className="font-semibold">{t("paymentMethod")}</h4>
        <p>
          {t("by")}:<i className="ml-2 text-slate-500">{t(order?.payment?.name)}</i>
        </p>
        <p>
          {t("paymentStatus")}:<i className="ml-2 text-slate-500">{status}</i>
        </p>
      </div>
    </div>
  );
};

export default memo(ProfileOrderHistoryGridContentBodyInformation);
