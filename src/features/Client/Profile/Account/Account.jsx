import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import ProfileAccountInformation from "./Information";
import ProfileAccountSecurity from "./Security";

const ProfileAccount = () => {
  const { t } = useTranslation();

  useDocumentTitle(t("account"));

  return (
    <div>
      <div className="mb-6 text-xl font-semibold">{t("account")}</div>

      <div className="grid grid-cols-5 gap-6 rounded-lg bg-white">
        <div className="col-span-3 border-r-2 pr-6">
          <ProfileAccountInformation />
        </div>
        <div className="col-span-2">
          <ProfileAccountSecurity />
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileAccount);
