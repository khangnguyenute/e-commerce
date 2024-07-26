import { memo } from "react";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "@hooks/useDocumentTitle";

import HomePromotion from "./Components/Promotion";
import HomeCarouselBanner from "./Components/CarouselBanner";

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
    <div>
      <div className="section__container flex flex-col space-y-6 py-6">
        <HomeCarouselBanner />
        <HomePromotion
          sliders={sliders}
          category="Phone"
          title="Đại tiệc Samsung"
          className="bg-green-800 px-4"
        />
        <HomePromotion
          category="Tablet"
          image="https://cdn.tgdd.vn/2022/11/banner/Tagline-hotsale-1200x120-1.png"
          title="Mừng xuân 2024"
          className="bg-primary-600 px-4"
        />
        <HomePromotion
          category="Laptop"
          image="https://media.istockphoto.com/vectors/back-to-school-sale-horizontal-banner-first-day-of-school-vector-vector-id1158813066?k=6&m=1158813066&s=170667a&w=0&h=Iki3WgYaS0lNqp4jzLrssUNPyXx5T30tt3q6BAeD1k8="
          title="Siêu sale ngày tựu trường"
          className="bg-yellow-600 px-4"
        />
      </div>
    </div>
  );
};
export default memo(Home);
