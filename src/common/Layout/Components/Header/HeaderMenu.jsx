import { IoMdTabletPortrait, IoMdPhonePortrait, IoMdLaptop } from "react-icons/io";
import { BiBookOpen, BiBook } from "react-icons/bi";
import { MdContactSupport, MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderMenuItem from "./HeaderMenuItem";
import { getTwScreenWidth } from "@utils/Helpers";
import { twMerge } from "tailwind-merge";

const HeaderMenu = () => {
  const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState(false);

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

  const hanldeOpenMenu = useCallback(() => {
    if (getTwScreenWidth("md") < window.innerWidth) return;

    setIsOpened((prev) => !prev);
  }, []);

  return (
    <div className="col-span-1 md:col-span-4">
      <div
        role="button"
        tabIndex={0}
        onClick={hanldeOpenMenu}
        className="mx-auto w-fit rounded-md border-2 border-gray-400 p-1.5 hover:bg-gray-100 md:hidden"
      >
        {isOpened && <MdOutlineClose size={24} />}
        {!isOpened && <MdOutlineMenu size={24} />}
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={hanldeOpenMenu}
        className={twMerge(
          "absolute left-0 top-22 -z-10 flex w-full -translate-y-full flex-col items-center space-y-8 bg-gray-100 py-8 duration-200 md:static md:z-0 md:translate-y-0 md:flex-row md:space-x-4 md:space-y-0 md:bg-transparent md:py-0",
          isOpened && "translate-y-0",
        )}
      >
        <div className="mx-auto flex flex-col items-center justify-between space-x-0 space-y-8 md:flex-row md:space-x-4 md:space-y-0 lg:space-x-8">
          {menuConstant.map((item, index) => {
            return <HeaderMenuItem key={index} title={item.title} link={item.link} icon={item.icon} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderMenu);
