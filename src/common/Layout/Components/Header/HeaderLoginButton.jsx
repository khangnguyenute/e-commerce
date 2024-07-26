import { Button } from "@common/Components";
import { AUTH_API_PATH } from "@constants/apiConstant";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeaderLoginButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateLogin = useCallback(() => {
    navigate(AUTH_API_PATH.LOGIN);
  }, [navigate]);

  return (
    <Button onClick={navigateLogin}>
      {t("login")}
    </Button>
  );
};

export default memo(HeaderLoginButton);
