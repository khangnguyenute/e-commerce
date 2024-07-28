import { memo } from "react";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "@hooks/useDocumentTitle";
import HomePromotion from "./HomePromotion";
import HomeBanner from "./HomeBanner";

const sliders = [
  "https://cdn.tgdd.vn/2022/07/banner/380-x-200-380x200.png",
  "https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-1-380x200-3.png",
  "https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-380x200-4.png",
  "https://cdn.tgdd.vn/2022/07/banner/380x200-380x200-3.png",
  "https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-1-380x200-2.png",
  "https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-2-380x200-3.png",
];

const Home = () => {
  const { t } = useTranslation();

  useDocumentTitle(t("home"));

  return (
    <>
      <HomeBanner />
      <div className="section__container flex flex-col space-y-4 py-4 md:space-y-6 md:py-6">
        <HomePromotion
          sliders={sliders}
          category="Phone"
          title="Đại tiệc Samsung"
          className="bg-phone px-4"
        />
        <HomePromotion category="Tablet" title="Mừng xuân 2024" className="bg-tablet px-4" />
        <HomePromotion category="Laptop" title="Siêu sale ngày tựu trường" className="bg-laptop px-4" />
      </div>
    </>
  );
};
export default memo(Home);
