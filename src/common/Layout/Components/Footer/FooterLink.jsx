import { memo } from "react";
import { useTranslation } from "react-i18next";

import FooterLinkItem from "./FooterLinkItem";
import { HOME_PATH } from "@constants/routeConstant";

const FooterLink = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className="my-2 flex flex-col sm:my-4">
        <div className="mb-3 font-bold">{t("company")}</div>
        <div className="flex flex-col ">
          <FooterLinkItem to={HOME_PATH.COMPANY}>{t("company")}</FooterLinkItem>
          <FooterLinkItem to={HOME_PATH.BLOGS}>{t("blogs")}</FooterLinkItem>
          <FooterLinkItem to={HOME_PATH.PARTNERS}>{t("partners")}</FooterLinkItem>
          <FooterLinkItem to={HOME_PATH.CONTACT}>{t("contact")}</FooterLinkItem>
        </div>
      </div>
      <div className="my-2 flex flex-col sm:my-4">
        <div className="mb-3 font-bold">{t("support")}</div>
        <div className="flex flex-col ">
          <FooterLinkItem to={HOME_PATH.GETTING_STARTED}>{t("started")}</FooterLinkItem>
          <FooterLinkItem to={HOME_PATH.DOCUMENTATION}>{t("documentation")}</FooterLinkItem>
          <FooterLinkItem to={HOME_PATH.GUIDE}>{t("guides")}</FooterLinkItem>
          <FooterLinkItem to={HOME_PATH.FAQ}>{t("faqs")}</FooterLinkItem>
        </div>
      </div>
      <div className="my-2 flex flex-col sm:my-4">
        <div className="mb-3 font-bold">{t("trustLegal")}</div>
        <div className="flex flex-col ">
          <FooterLinkItem to={HOME_PATH.TERM}>{t("termsConditions")}</FooterLinkItem>
          <FooterLinkItem to={HOME_PATH.NOTICE}>{t("notice")}</FooterLinkItem>
          <FooterLinkItem to={HOME_PATH.CLAIM}>{t("claim")}</FooterLinkItem>
        </div>
      </div>
    </div>
  );
};

export default memo(FooterLink);
