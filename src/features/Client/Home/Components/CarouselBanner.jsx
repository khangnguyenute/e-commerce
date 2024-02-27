import { Carousel } from "@common/Components";
import { memo } from "react";

const sliders = [
  "https://lzd-img-global.slatic.net/g/skyline/i8/181bae37497e49ebba4f2312d75f2a63-1360-480.jpg_2200x2200q75.jpg_.webp",
  "https://cf.shopee.vn/file/36ac1ea8ffce66d9d0e239c947d3538b",
  "https://cf.shopee.vn/file/6fa078a7264069a1502f46a26c2c4178",
  "https://cpn.vn/product_images/uploaded_images/dthoai-banner.png",
  "https://cf.shopee.ph/file/ddc2d75ce2742111f4025666a88ec059",
  "https://cf.shopee.vn/file/39684aa40e2666ebf61d2bdbcbbcb735",
];

const HomeCarouselBanner = () => {
  return (
    <div className="relative">
      <Carousel gallery={sliders} contentClassName="h-96 w-full rounded-xl object-fill" />
    </div>
  );
};

export default memo(HomeCarouselBanner);
