import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ProfileAccountSecurityModificationPassword from "./ModificationPassword";
import ProfileAccountSecurityModificationEmail from "./ModificationEmail";
import ProfileAccountSecurityModificationPhone from "./ModificationPhone";
import { Section } from "@common/Components";
import { BsChevronLeft } from "react-icons/bs";
import { PROFILE_PATH } from "@constants/routeConstant";

const ProfileAccountSecurityModification = () => {
  const { t } = useTranslation();
  const { tab } = useParams();
  const navigate = useNavigate();

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

  const handleClickBack = useCallback(() => {
    navigate(PROFILE_PATH.ACCOUNT);
  }, [navigate]);

  return (
    <Section title={title}>
      <div className="mx-auto w-1/2">{children}</div>
      <div
        role="button"
        tabIndex={0}
        className="mt-4 flex items-center text-blue-500 hover:text-blue-700"
        onClick={handleClickBack}
      >
        <BsChevronLeft />
        <span>{t("back")}</span>
      </div>
    </Section>
  );
};

export default memo(ProfileAccountSecurityModification);
