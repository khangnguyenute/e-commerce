import { Carousel, Section } from "@common/Components";
import useToast from "@hooks/useToast";
import { getProducts } from "@services/productService";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  360: {
    slidesPerView: 2,
  },
  576: {
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

const ProductDetailRelationship = ({ category }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await getProducts({ category });

      setProductData(data);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [category, t, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Section title={t("relatedProducts")}>
      <Carousel
        gallery={productData}
        isLoading={isLoading}
        slidesPerView={5}
        contentClassName="h-36 xs:h-72 sm:h-80 xs:block"
        breakpoints={breakpoints}
      />
    </Section>
  );
};

export default memo(ProductDetailRelationship);
