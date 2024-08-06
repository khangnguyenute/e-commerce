import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import ProfileAccountInformation from "./Information";
import ProfileAccountSecurity from "./Security/Security";
import { Section } from "@common/Components";

const ProfileAccount = () => {
  const { t } = useTranslation();

  useDocumentTitle(t("account"));

  return (
    <Section title={t("account")}>
      <div className="grid gap-6 rounded-lg bg-white lg:grid-cols-5">
        <ProfileAccountInformation className="lg:col-span-3 lg:border-r-2 lg:pr-6" />
        <ProfileAccountSecurity className="lg:col-span-2" />
      </div>
    </Section>
  );
};

export default memo(ProfileAccount);
