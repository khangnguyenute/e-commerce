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
  ProductDetailDescription,
  ProductDetailGallery,
  ProductDetailInformation,
  ProductDetailPromotion,
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
    <div className="mx-auto my-6 flex w-320 flex-col space-y-6">
      <ProductDetailBreadcrumb product={product} />
      <div className="flex flex-col space-y-6">
        <div className="flex gap-8">
          <div className="flex w-1/2 flex-col space-y-6">
            <ProductDetailGallery product={product} />
            <ProductDetailDescription description={product.information} />
            <ProductDetailRating product={product} getProduct={getProduct} />
          </div>
          <div className="flex w-1/2 flex-col space-y-6">
            <ProductDetailInformation product={product} />
            <ProductDetailPromotion />
            <ProductDetailConfiguration product={product} />
          </div>
        </div>
        <ProductDetailRelationship category={product.category} />
      </div>
    </div>
  );
};

export default memo(ProductDetail);
