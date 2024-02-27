import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeaderLoginButton = () => {
  const { t } = useTranslation();

  return (
    <Link to="/auth/login">
      <button
        type="button"
        className="my-4 justify-center rounded-full border-solid border-black bg-red-600 px-[30px] py-3 text-center text-[12px] font-semibold leading-6 text-white focus:bg-red-700 hover:cursor-pointer hover:bg-red-700 sm:text-base"
      >
        {t("login")}
      </button>
    </Link>
  );
};

export default memo(HeaderLoginButton);
