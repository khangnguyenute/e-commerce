import { MdLocationOn, MdPerson, MdOutlineListAlt, MdFavorite } from "react-icons/md";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import ProfileSidebarItem from "./SidebarItem";
import { PROFILE_PATH } from "@constants/routeConstant";
import { Section } from "@common/Components";

const ProfileSidebar = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Section title={t("profile")} className={className}>
      <div className="flex w-full flex-wrap gap-4 md:flex-col">
        <ProfileSidebarItem to={PROFILE_PATH.ACCOUNT} icon={<MdPerson size={24} />} text={t("account")} />
        <ProfileSidebarItem
          to={PROFILE_PATH.ORDER_HISTORY}
          icon={<MdOutlineListAlt size={24} />}
          text={t("orderHistory")}
        />
        <ProfileSidebarItem to={PROFILE_PATH.ADDRESS} icon={<MdLocationOn size={24} />} text={t("address")} />
        <ProfileSidebarItem to={PROFILE_PATH.FAVORITE} icon={<MdFavorite size={24} />} text={t("favorite")} />
      </div>
    </Section>
  );
};

export default memo(ProfileSidebar);
