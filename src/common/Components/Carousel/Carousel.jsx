import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselItem from "./Carouseltem";
import { twMerge } from "tailwind-merge";
import { LoadingSkeleton } from "../Loading";
import { memo, useCallback, useLayoutEffect, useState } from "react";

const Carousel = ({
  gallery,
  isLoop = true,
  isThumbs = false,
  isLoading,
  breakpoints = null,
  className,
  thumbsClassName,
  contentClassName,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(null);

  const getSkeletonCount = useCallback(
    (width) => {
      const sortedBreakpoints = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => a - b);
      let slidesPerView = 1;

      for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
        if (width >= sortedBreakpoints[i]) {
          slidesPerView = breakpoints[sortedBreakpoints[i]].slidesPerView;
          break;
        }
      }

      return slidesPerView;
    },
    [breakpoints],
  );

  useLayoutEffect(() => {
    const handleResize = () => {
      const slideCount = getSkeletonCount(window.innerWidth);
      setSlidesPerView(slideCount);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getSkeletonCount]);

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
