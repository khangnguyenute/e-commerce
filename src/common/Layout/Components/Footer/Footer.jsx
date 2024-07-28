import { memo } from "react";
import { useTranslation } from "react-i18next";

import { PROJECT_NAME } from "@constants/commonConstant";
import { Logo } from "@common/Components/Logo";
import { HOME_PATH } from "@constants/routeConstant";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import FooterSocial from "./FooterSocial";
import FooterLink from "./FooterLink";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="border-t-2 border-gray-100 bg-opacity-10 bg-footer" id="footer">
      <div className="section__container">
        <div className="z-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Logo />
            <p className="my-4 max-w-none lg:max-w-96">{t("siteDescription")}</p>
            <div className="flex items-center gap-x-4">
              <FooterSocial icon={<FiFacebook />} className="text-blue-500 hover:bg-blue-500" />
              <FooterSocial icon={<FiInstagram />} className="text-primary-500 hover:bg-primary-500" />
              <FooterSocial icon={<FiTwitter />} className="text-cyan-500 hover:bg-cyan-500" />
              <FooterSocial icon={<FiLinkedin />} className="text-blue-500 hover:bg-blue-500" />
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-bold">{t("company")}</h4>
            <FooterLink to={HOME_PATH.COMPANY}>{t("company")}</FooterLink>
            <FooterLink to={HOME_PATH.BLOGS}>{t("blogs")}</FooterLink>
            <FooterLink to={HOME_PATH.PARTNERS}>{t("partners")}</FooterLink>
            <FooterLink to={HOME_PATH.CONTACT}>{t("contact")}</FooterLink>
          </div>
          <div>
            <h4 className="mb-3 font-bold">{t("support")}</h4>
            <FooterLink to={HOME_PATH.GETTING_STARTED}>{t("started")}</FooterLink>
            <FooterLink to={HOME_PATH.DOCUMENTATION}>{t("documentation")}</FooterLink>
            <FooterLink to={HOME_PATH.GUIDE}>{t("guides")}</FooterLink>
            <FooterLink to={HOME_PATH.FAQ}>{t("faqs")}</FooterLink>
          </div>
          <div>
            <h4 className="mb-3 font-bold">{t("trustLegal")}</h4>
            <FooterLink to={HOME_PATH.TERM}>{t("termsConditions")}</FooterLink>
            <FooterLink to={HOME_PATH.NOTICE}>{t("notice")}</FooterLink>
            <FooterLink to={HOME_PATH.CLAIM}>{t("claim")}</FooterLink>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-100 py-2 text-center">
        <p>&copy; {PROJECT_NAME} 2024. All rights reserved.</p>
      </div>
    </div>
  );
};

export default memo(Footer);
