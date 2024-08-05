import { useParams } from "react-router-dom";
import { memo, useCallback, useEffect, useState } from "react";
import { productService } from "@services/index";
import { LoadingSpinner } from "@common/Components";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";
import { NotFoundError } from "@common/Error/Components";
import {
  ProductDetailBreadcrumb,
  ProductDetailConfiguration,
  ProductDetailGallery,
  ProductDetailInformation,
  ProductDetailRating,
  ProductDetailRelationship,
} from "./Components";

const ProductDetail = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const getProduct = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await productService.getProductById(id);

      setProduct(data);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [id, t, toast]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  if (isLoading) {
    return (
      <div className="-mt-20 flex h-screen w-full items-center justify-center">
        <LoadingSpinner className="h-10 w-10" />
      </div>
    );
  }

  if (!product) {
    return <NotFoundError />;
  }

  return (
    <div className="section__container flex flex-col space-y-6">
      <ProductDetailBreadcrumb product={product} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProductDetailGallery product={product} />
        <ProductDetailInformation product={product} />
        <ProductDetailConfiguration product={product} />
        <ProductDetailRating
          product={product}
          getProduct={getProduct}
          className="md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3"
        />
      </div>
      <ProductDetailRelationship category={product.category} />
    </div>
  );
};

export default memo(ProductDetail);
