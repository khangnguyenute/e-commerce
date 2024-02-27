import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BiTable } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { GiStabbedNote } from "react-icons/gi";
import { TbBrandDenodo } from "react-icons/tb";
import { BsPhone } from "react-icons/bs";
import { ADMIN_PATH } from "@constants/routeConstant";
import { LayoutSidebar, LayoutSidebarItem } from "@common/Layout";
import LayoutSidebarGroup from "@common/Layout/Components/Sidebar/Group";
import { MdDevicesOther, MdOutlineFormatListBulleted } from "react-icons/md";
import { RiCoupon3Line, RiDiscussLine } from "react-icons/ri";

const LayoutSidebarAdmin = ({ className, containerClassName }) => {
  const { t } = useTranslation();

  const defaultCollapsedSidebarPaths = useMemo(() => [ADMIN_PATH.HOME], []);

  return (
    <LayoutSidebar
      id="adminSidebar"
      className={className}
      containerClassName={containerClassName}
      defaultCollapsedPaths={defaultCollapsedSidebarPaths}
    >
      <LayoutSidebarItem id="dashboard" to={ADMIN_PATH.HOME} icon={<BiTable />} text={t("dashboard")} />
      <LayoutSidebarGroup title={t("general")} id="general" icon={<MdOutlineFormatListBulleted />}>
        <LayoutSidebarItem
          id="userManagement"
          to={ADMIN_PATH.USER_MANAGEMENT}
          icon={<FiUser />}
          text={t("user")}
        />
        <LayoutSidebarItem
          id="orderManagement"
          to={ADMIN_PATH.ORDER_MANAGEMENT}
          icon={<GiStabbedNote />}
          text={t("order")}
        />
        <LayoutSidebarItem
          id="ratingManagement"
          to={ADMIN_PATH.RATING_MANAGEMENT}
          icon={<RiDiscussLine />}
          text={t("rating")}
        />
      </LayoutSidebarGroup>
      <LayoutSidebarGroup title={t("product")} id="product" icon={<MdDevicesOther />}>
        <LayoutSidebarItem
          id="categoryManagement"
          to={ADMIN_PATH.CATEGORY_MANAGEMENT}
          icon={<MdDevicesOther />}
          text={t("category")}
        />
        <LayoutSidebarItem
          id="brandManagement"
          to={ADMIN_PATH.BRAND_MANAGEMENT}
          icon={<TbBrandDenodo />}
          text={t("brand")}
        />
        <LayoutSidebarItem
          id="productManagement"
          to={ADMIN_PATH.PRODUCT_MANAGEMENT}
          icon={<BsPhone />}
          text={t("product")}
        />
        <LayoutSidebarItem
          id="voucherManagement"
          to={ADMIN_PATH.VOUCHER_MANAGEMENT}
          icon={<RiCoupon3Line />}
          text={t("voucher")}
        />
      </LayoutSidebarGroup>
    </LayoutSidebar>
  );
};

export default memo(LayoutSidebarAdmin);
