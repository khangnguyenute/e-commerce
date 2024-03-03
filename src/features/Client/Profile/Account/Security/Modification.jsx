import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ProfileAccountSecurityModificationPassword from "./ModificationPassword";
import ProfileAccountSecurityModificationEmail from "./ModificationEmail";
import ProfileAccountSecurityModificationPhone from "./ModificationPhone";

const ProfileAccountSecurityModification = () => {
  const { t } = useTranslation();
  const { tab } = useParams();

  const title = useMemo(() => {
    if (tab === "password") {
      return t("changePassword");
    }
    if (tab === "email") {
      return t("changeEmail");
    }
    if (tab === "phone") {
      return t("changePhone");
    }
  }, [t, tab]);

  const children = useMemo(() => {
    if (tab === "password") {
      return <ProfileAccountSecurityModificationPassword />;
    }
    if (tab === "email") {
      return <ProfileAccountSecurityModificationEmail />;
    }
    if (tab === "phone") {
      return <ProfileAccountSecurityModificationPhone />;
    }
  }, [tab]);

  return (
    <div>
      <div className="mb-6 text-xl font-semibold">{title}</div>
      <div className="mx-auto w-1/2">{children}</div>
    </div>
  );
};

export default memo(ProfileAccountSecurityModification);
