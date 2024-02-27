import { CLIENT_PATH } from "@constants/routeConstant";
import { lowerCase } from "lodash";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductDetailBreadcrumb = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(CLIENT_PATH.PRODUCT(lowerCase(product.category)));
  }, [navigate, product.category]);

  return (
    <div className="flex items-center space-x-2">
      <div role="button" tabIndex={0} className="text-blue-500 hover:text-blue-700" onClick={handleClick}>
        {t(product?.category)}
      </div>
      <BsChevronRight />
      <div className="text-blue-500 hover:text-blue-700">{product?.brand}</div>
    </div>
  );
};

export default memo(ProductDetailBreadcrumb);
