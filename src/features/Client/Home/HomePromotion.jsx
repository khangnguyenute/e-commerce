import { memo, useCallback, useEffect, useState } from "react";
import useToast from "@hooks/useToast";
import { Button, Carousel, LoadingSkeleton, Section } from "@common/Components";
import { productService } from "@services/index";
import { useTranslation } from "react-i18next";
import { isEmpty, lowerCase } from "lodash";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "@constants/routeConstant";

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  360: {
    slidesPerView: 2,
  },
  500: {
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

  const [isLoading, setIsLoading] = useState(false);
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
    <Section isLoading={isLoading} title={title} className={className}>
      {sliders && !isEmpty(sliders) && (
        <Carousel
          gallery={sliders}
          isLoading={isLoading}
          contentClassName="h-fit w-full rounded-md object-fill"
          breakpoints={{
            0: { slidesPerView: 2 },
            500: { slidesPerView: 3 },
          }}
        />
      )}
      <Carousel
        gallery={deviceData}
        isLoading={isLoading}
        slidesPerView={5}
        contentClassName="h-36 xs:h-64 sm:h-80"
        breakpoints={breakpoints}
      />
      {isLoading ? (
        <LoadingSkeleton className="mx-auto h-11 w-1/2 rounded-sm lg:rounded-full" />
      ) : (
        <Button color="light" onClick={handleClickMoreProduct} className="mx-auto w-1/2">
          {t("viewMore")}
        </Button>
      )}
    </Section>
  );
};

export default memo(HomePromotion);
