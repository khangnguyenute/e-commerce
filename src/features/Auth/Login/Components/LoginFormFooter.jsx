import { AUTH_PATH } from "@constants/routeConstant";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

const LoginFormFooter = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  return (
    <>
      {t("doNotHaveAccount")}
      <Link
        to={`${AUTH_PATH.REGISTER}?redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`}
        className="ml-1 block font-semibold underline hover:text-primary-700 sm:inline-block"
      >
        {t("createNow")}
      </Link>
    </>
  );
};

export default memo(LoginFormFooter);
