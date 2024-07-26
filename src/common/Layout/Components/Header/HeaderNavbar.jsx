import { HOME_PATH } from "@constants/routeConstant";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeaderNavbar = () => {
  const { t } = useTranslation();

  return (
    <div className="ml-8 hidden items-center space-x-6 lg:flex">
      <Link className="cursor-pointer duration-200 hover:text-primary-700" to={HOME_PATH.COMPANY}>
        {t("company")}
      </Link>
      <Link className="cursor-pointer duration-200 hover:text-primary-700" to={HOME_PATH.FEATURES}>
        {t("features")}
      </Link>
      <Link className="cursor-pointer duration-200 hover:text-primary-700" to={HOME_PATH.PARTNERS}>
        {t("partners")}
      </Link>
      <Link className="cursor-pointer duration-200 hover:text-primary-700" to={HOME_PATH.BLOGS}>
        {t("blogs")}
      </Link>
      <Link className="cursor-pointer duration-200 hover:text-primary-700" to={HOME_PATH.CONTACT}>
        {t("contact")}
      </Link>
    </div>
  );
};
export default memo(HeaderNavbar);
