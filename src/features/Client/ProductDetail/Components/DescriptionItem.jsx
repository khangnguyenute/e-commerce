import { memo } from "react";

const ProductDetailDescriptionItem = ({ icon, content, detail }) => {
  return (
    <div>
      <div className="mr-2 inline-block translate-y-1 text-blue-700">{icon}</div>
      <span>{content}</span>
      <i className="ml-1 cursor-pointer text-blue-700">{detail}</i>
    </div>
  );
};

export default memo(ProductDetailDescriptionItem);
