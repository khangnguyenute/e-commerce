import { ProductCard } from "@common/Components/DisplayProduct";
import { memo } from "react";

const ProductContainerGrid = ({ products, isBorder }) => {
  return (
    <div className="grid grid-cols-5 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} data={product} isBorder={isBorder} />
      ))}
    </div>
  );
};
export default memo(ProductContainerGrid);
