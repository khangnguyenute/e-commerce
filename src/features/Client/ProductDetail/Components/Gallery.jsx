import { memo, useMemo } from "react";
import { Carousel } from "@common/Components";

const ProductDetailGallery = ({ product }) => {
  const gallery = useMemo(() => [product.image, ...product.gallery], [product]);

  return (
    <div className="relative border p-4">
      <Carousel
        gallery={gallery}
        isThumbs
        contentClassName="mb-4 h-96 w-full object-scale-down"
        thumbsClassName="h-20 w-20 object-cover"
      />
    </div>
  );
};

export default memo(ProductDetailGallery);
