import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { memo, useState } from "react";
import CarouselItem from "./Carouseltem";
import { twMerge } from "tailwind-merge";
import { LoadingSkeleton } from "../Loading";

const Carousel = ({
  gallery,
  isLoop = true,
  isThumbs = false,
  isLoading,
  slidesPerView,
  slidesPerGroup = 1,
  breakpoints = null,
  className,
  thumbsClassName,
  contentClassName,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (isLoading) {
    return (
      <div
        className={twMerge("grid w-full gap-3", className)}
        style={{ gridTemplateColumns: `repeat(${slidesPerView}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: slidesPerView }).map((_, index) => {
          return <LoadingSkeleton key={index} className={contentClassName} />;
        })}
      </div>
    );
  }

  return (
    <div className={twMerge("w-full", className)}>
      <Swiper
        loop={isLoop}
        spaceBetween={12}
        {...(slidesPerView && { slidesPerView })}
        slidesPerGroup={slidesPerGroup}
        navigation={true}
        {...(isThumbs && {
          thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null },
        })}
        modules={[FreeMode, Navigation, Thumbs]}
        breakpoints={breakpoints}
      >
        {gallery.map((data, index) => (
          <SwiperSlide key={index}>
            <CarouselItem data={data} className={contentClassName} />
          </SwiperSlide>
        ))}
      </Swiper>

      {isThumbs && (
        <Swiper
          {...(isThumbs && {
            onSwiper: setThumbsSwiper,
          })}
          spaceBetween={12}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {gallery.map((data, index) => (
            <SwiperSlide key={index}>
              <CarouselItem data={data} className={thumbsClassName} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default memo(Carousel);
