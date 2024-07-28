import { Carousel, Section } from "@common/Components";
import useToast from "@hooks/useToast";
import { getProducts } from "@services/productService";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
    <Section>
      <div className="w-full text-xl font-semibold">{t("relatedProducts")}</div>
      <Carousel gallery={productData} isLoading={isLoading} slidesPerView={5} />
    </Section>
  );
};

export default memo(ProductDetailRelationship);
