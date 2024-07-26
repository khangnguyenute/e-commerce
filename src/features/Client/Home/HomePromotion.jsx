import { memo, useCallback, useEffect, useState } from "react";
import useToast from "@hooks/useToast";
import { Button, Carousel, LoadingSkeleton, Section } from "@common/Components";
import { productService } from "@services/index";
import { useTranslation } from "react-i18next";
import { isEmpty, lowerCase } from "lodash";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "@constants/routeConstant";

// const breakpoints = {
//   0: {
//     slidesPerView: 1,
//   },
//   360: {
//     slidesPerView: 2,
//   },
//   576: {
//     slidesPerView: 3,
//   },
//   768: {
//     slidesPerView: 4,
//   },
//   992: {
//     slidesPerView: 5,
//   },
// };

const HomePromotion = ({ title, image, category, sliders, className }) => {
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
    <Section isLoading={isLoading} title={title} image={image} className={className}>
      {sliders && !isEmpty(sliders) && (
        <Carousel
          gallery={sliders}
          isLoading={isLoading}
          slidesPerView={3}
          contentClassName="h-48 w-full rounded-xl object-fill"
        />
      )}
      <Carousel
        gallery={deviceData}
        isLoading={isLoading}
        slidesPerView={5}
        contentClassName="min-h-88"
        // breakpoints={breakpoints}
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