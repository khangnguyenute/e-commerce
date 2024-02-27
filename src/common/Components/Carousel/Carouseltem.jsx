import { memo } from "react";
import { ProductCard } from "../DisplayProduct";

/**
 * data: image || product
 */
const CarouselItem = ({ data, className }) => {
  if (typeof data === "string") {
    return <img src={data} alt="" className={className} />;
  }

  return <ProductCard data={data} className={className} />;
};

export default memo(CarouselItem);
