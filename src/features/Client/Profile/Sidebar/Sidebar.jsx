import { MdLocationOn, MdPerson, MdOutlineListAlt, MdFavorite } from "react-icons/md";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import ProfileSidebarItem from "./SidebarItem";
import { PROFILE_PATH } from "@constants/routeConstant";

const ProfileSidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col space-y-4 p-6">
      <div className="text-xl font-semibold">{t("profile")}</div>

      <ProfileSidebarItem to={PROFILE_PATH.ACCOUNT} icon={<MdPerson size={24} />} text={t("account")} />
      <ProfileSidebarItem
        to={PROFILE_PATH.ORDER_HISTORY}
        icon={<MdOutlineListAlt size={24} />}
        text={t("orderHistory")}
      />
      <ProfileSidebarItem to={PROFILE_PATH.ADDRESS} icon={<MdLocationOn size={24} />} text={t("address")} />
      <ProfileSidebarItem to={PROFILE_PATH.FAVORITE} icon={<MdFavorite size={24} />} text={t("favorite")} />
    </div>
  );
};

export default memo(ProfileSidebar);
