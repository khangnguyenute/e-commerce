import { memo } from "react";
import { useTranslation } from "react-i18next";

import shape01Image from "../../../../assets/images/footer/shape_01.png";
import { PROJECT_NAME } from "@constants/commonConstant";
import { Logo } from "@common/Components/Logo";
import FooterLink from "./FooterLink";
import FooterSocialIcon from "./FooterSocialIcon";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="relative z-40 overflow-hidden border-t-2 border-gray-100 bg-white" id="footer">
      <div className="mx-auto w-320">
        <div className="absolute left-0 top-4 z-0 h-full w-full">
          <div className="absolute flex h-full w-full">
            <img src={shape01Image} alt="background" className="h-full w-full object-contain object-center" />
          </div>
        </div>
        <div className="relative z-10 grid gap-x-10 py-4 sm:grid-cols-2 sm:py-6 md:grid-cols-3 md:py-10">
          <div className="">
            <div className="mt-1.5">
              <Logo className="flex items-center justify-center" imageClassName="h-20" />
            </div>
            <div className="mt-2">{t("siteDescription")}</div>
          </div>
          <FooterLink className="relative z-10 mt-6 grid-cols-1 xs:hidden xs:grid-cols-2 sm:mt-0 md:col-span-2 md:grid md:grid-cols-3" />
        </div>
        <div className="relative z-10 mt-2 items-center justify-between border-t-2 border-gray-100 py-4 md:flex">
          <div className="text-center md:text-left">
            &copy; {PROJECT_NAME} 2024. {t("reserved")}
          </div>
          <FooterSocialIcon className="mt-4 flex justify-center gap-x-3 md:mt-0 md:justify-start md:gap-x-4" />
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
