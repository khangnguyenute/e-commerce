import ProductBanner from "./Components/Banner";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "@hooks/useDocumentTitle";
import ProductContainer from "./Components/Container";
import { memo } from "react";

const Product = ({ category }) => {
  const { t } = useTranslation();

  useDocumentTitle(t(category));

  return (
    <div className="">
      <ProductBanner />
      <ProductContainer category={category} />
    </div>
  );
};
export default memo(Product);
