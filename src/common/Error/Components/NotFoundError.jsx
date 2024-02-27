import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateAuthRedirectURL } from "@auth/Utils/GenerateAuthRedirectURL";
import { Button } from "@common/Components";

const NotFoundError = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.common.user);

  const navigate = useNavigate();

  const backToHome = useCallback(() => {
    if (!user) {
      return;
    }
    const redirectURL = generateAuthRedirectURL([user.role]);

    navigate(redirectURL);
  }, [navigate, user]);

  return (
    <div className="relative flex h-fit-layout w-full flex-col items-center justify-center">
      <div className="flex flex-col items-start justify-center space-y-4">
        <div className="text-5xl font-semibold">404</div>
        <div className="text-xl font-semibold">{t("title")}</div>
        <div className="pb-3">{t("message")}</div>
        <Button className="rounded-full shadow-none" size="sm" onClick={backToHome}>
          {t("backToHome")}
        </Button>
      </div>
    </div>
  );
};

export default memo(NotFoundError);
