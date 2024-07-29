import { Carousel } from "@common/Components";
import { memo } from "react";

const images = [
  "//cdn.tgdd.vn/2022/07/banner/800-200-800x200-22.png",
  "//cdn.tgdd.vn/2022/07/banner/800-200-800x200-18.png",
  "//cdn.tgdd.vn/2022/06/banner/18-imac-800-200-800x200.png",
  "//cdn.tgdd.vn/2022/07/banner/800-200-800x200-42.png",
  "//cdn.tgdd.vn/2022/07/banner/18-intel-800-200-800x200.png",
];

const ProductBanner = () => {
  return (
    <div className="section__container grid grid-cols-2 gap-4 pb-0 sm:grid-cols-3">
      <div className="col-span-2">
        <Carousel gallery={images} slidesPerView={1} contentClassName="rounded-md" />
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-4 sm:col-span-1 sm:grid-cols-1">
        <img
          src="//cdn.tgdd.vn/2022/05/banner/sticky-intel-390-97-390x97.png"
          alt=""
          className="w-full rounded-md"
        />
        <img
          src="//cdn.tgdd.vn/2022/06/banner/Xa-hang-Laptop-2-390x97-1.png"
          alt=""
          className="w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default memo(ProductBanner);
