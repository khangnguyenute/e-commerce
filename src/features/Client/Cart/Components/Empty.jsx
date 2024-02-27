import { useNavigate } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { CLIENT_PATH } from "@constants/routeConstant";

const CartEmpty = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackToHome = useCallback(() => {
    navigate(CLIENT_PATH.HOME);
  }, [navigate]);

  return (
    <div className="flex h-fit-layout flex-col items-center justify-center space-y-6 bg-white py-6">
      <div className="text-9xl text-primary-600">
        <BsCartCheckFill />
      </div>
      <p>{t("emptyCart")}</p>
      <div
        role="button"
        tabIndex={0}
        onClick={handleBackToHome}
        className="rounded-xl border border-blue-500 bg-transparent px-60 py-4 font-semibold uppercase text-blue-700"
      >
        {t("backToHome")}
      </div>
    </div>
  );
};

export default memo(CartEmpty);
