import { memo, useEffect, useRef, useState } from "react";

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

const Home = () => {
  const [padding, setPadding] = useState(0);
  const bannerRef = useRef(null);
  const absoluteRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current || !absoluteRef.current) {
      return;
    }

    const setMinHeight = () => {
      if (window.innerWidth > 359) {
        setPadding(absoluteRef.current.offsetWidth / 14);
      } else {
        setPadding(absoluteRef.current.offsetWidth / 8);
      }
    };
    setMinHeight();

    window.addEventListener("resize", setMinHeight);
    return () => {
      window.removeEventListener("resize", setMinHeight);
    };
  }, []);

  return (
    <div className="relative" style={{ paddingBottom: padding }} ref={bannerRef}>
      <div className="h-banner min-h-banner bg-banner bg-cover bg-center bg-no-repeat"></div>
      <div
        className="section__container absolute bottom-0 left-1/2 w-3/4 -translate-x-1/2 py-0 xs:w-full md:w-3/4"
        ref={absoluteRef}
      >
        <Carousel
          gallery={banners}
          contentClassName="h-fit w-full rounded-md object-cover shadow-base"
          breakpoints={{
            0: { slidesPerView: 1 },
            360: { slidesPerView: 2 },
          }}
        />
      </div>
    </div>
  );
};
export default memo(Home);
