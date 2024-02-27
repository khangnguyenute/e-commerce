import { IoMdTabletPortrait, IoMdPhonePortrait, IoMdLaptop } from "react-icons/io";
import { BiHeadphone, BiBookOpen, BiBook } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import HeaderMenuItem from "./HeaderMenuItem";

const HeaderMenu = () => {
  const { t } = useTranslation();

  const menuConstant = useMemo(
    () => [
      {
        title: t("phone"),
        link: "phone",
        icon: <IoMdPhonePortrait size={20} />,
      },
      {
        title: t("tablet"),
        link: "tablet",
        icon: <IoMdTabletPortrait size={20} />,
      },
      {
        title: t("laptop"),
        link: "laptop",
        icon: <IoMdLaptop size={20} />,
      },
      {
        title: t("accessories"),
        link: "accessories",
        icon: <BiHeadphone size={20} />,
      },
      {
        title: t("support"),
        link: "support",
        icon: <MdContactSupport size={20} />,
      },
      {
        title: t("guide"),
        link: "guide",
        icon: <BiBookOpen size={20} />,
      },
      {
        title: t("term"),
        link: "term",
        icon: <BiBook size={20} />,
      },
    ],
    [t],
  );

  return (
    <div className="flex items-center justify-between space-x-4">
      {menuConstant.map((item, index) => {
        return <HeaderMenuItem key={index} title={item.title} link={item.link} icon={item.icon} />;
      })}
    </div>
  );
};

export default memo(HeaderMenu);
