import ProductBanner from "./Components/Banner";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "@hooks/useDocumentTitle";
import ProductContainer from "./Components/Container";
import { memo } from "react";

const Product = ({ category }) => {
  const { t } = useTranslation();

  useDocumentTitle(t(category));

  return (
    <div className="my-6 flex flex-col space-y-6">
      <ProductBanner />
      <ProductContainer category={category} />
    </div>
  );
};
export default memo(Product);
