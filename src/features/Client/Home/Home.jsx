import { memo } from "react";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "@hooks/useDocumentTitle";

import HomePromotion from "./HomePromotion";
import { Carousel } from "@common/Components";

const banners = [
  "https://cdn.tgdd.vn/2024/06/banner/720x220-720x220-83.png",
  "https://cdn.tgdd.vn/2024/07/banner/Group-427320087-720x220.png",
  "https://cdn.tgdd.vn/2024/07/banner/720-220-FINAL-720x220-1.png",
  "https://cdn.tgdd.vn/2024/07/banner/720x220-720x220-91.png",
  "https://cdn.tgdd.vn/2024/07/banner/Nha-via-Doi-diem-720x220-720x220-1.png",
  "https://cdn.tgdd.vn/2024/07/banner/banner-720x220.jpg",
  "https://cdn.tgdd.vn/2024/07/banner/720x220-720x220-100.png",
  "https://cdn.tgdd.vn/2024/07/banner/720x220-new-720x220-4.png",
];

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
      <div className="relative mb-24 h-banner bg-banner bg-cover bg-center bg-no-repeat">
        <Carousel
          gallery={banners}
          className="section__container absolute bottom-0 left-1/2 w-2/3 -translate-x-1/2 translate-y-1/2"
          contentClassName="h-fit w-full rounded-xl object-cover shadow-base"
          slidesPerView={2}
          slidesPerGroup={2}
        />
      </div>
      <div className="section__container flex flex-col space-y-8 py-8">
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
    </>
  );
};
export default memo(Home);
