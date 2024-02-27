import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { CLIENT_PATH } from "@constants/routeConstant";

const CartHeader = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleBackToHome = useCallback(() => {
    navigate(CLIENT_PATH.HOME);
  }, [navigate]);

  return (
    <div className="flex justify-between">
      <p className="text-xl font-semibold">{t("cart")}</p>
      <div
        role="button"
        tabIndex={0}
        onClick={handleBackToHome}
        className="flex items-center text-sm text-blue-500"
      >
        <BsChevronLeft />
        {t("buyMoreProducts")}
      </div>
    </div>
  );
};

export default memo(CartHeader);
