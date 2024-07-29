import { ProductCard } from "@common/Components/ProductCard";
import { memo } from "react";

const ProductContainerGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
      {products.map((product, index) => (
        <ProductCard key={index} data={product} className="h-36 xs:block xs:h-80" />
      ))}
    </div>
  );
};
export default memo(ProductContainerGrid);
