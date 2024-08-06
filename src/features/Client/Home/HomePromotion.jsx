import { memo, useCallback, useEffect, useState } from "react";
import useToast from "@hooks/useToast";
import { Button, Carousel } from "@common/Components";
import { productService } from "@services/index";
import { useTranslation } from "react-i18next";
import { isEmpty, lowerCase } from "lodash";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "@constants/routeConstant";
import { twMerge } from "tailwind-merge";

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  360: {
    slidesPerView: 2,
  },
  512: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 4,
  },
  1024: {
    slidesPerView: 5,
  },
  1280: {
    slidesPerView: 6,
  },
};

const HomePromotion = ({ title, category, sliders, className }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [deviceData, setDeviceData] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await productService.getProducts({ category });

      setDeviceData(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [category, t, toast]);

  const handleClickMoreProduct = useCallback(() => {
    navigate(CLIENT_PATH.PRODUCT(lowerCase(category)));
  }, [category, navigate]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={twMerge("flex flex-col space-y-4 rounded-xl py-4 md:py-6 lg:py-8", className)}>
      <h1 className="w-full text-center text-2xl font-bold uppercase text-white sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {sliders && !isEmpty(sliders) && (
        <Carousel
          gallery={sliders}
          contentClassName="h-fit w-full rounded-md object-fill"
          breakpoints={{
            0: { slidesPerView: 2 },
            512: { slidesPerView: 3 },
          }}
        />
      )}
      <Carousel
        gallery={deviceData}
        isLoading={isLoading}
        contentClassName="h-36 xs:h-72 sm:h-80 xs:block"
        breakpoints={breakpoints}
      />

      <Button color="light" onClick={handleClickMoreProduct} className="mx-auto w-1/2">
        {t("viewMore")}
      </Button>
    </div>
  );
};

export default memo(HomePromotion);
