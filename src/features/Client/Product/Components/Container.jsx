import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ProductContainerGridSkeleton from "./GridSkeleton";
import { isEmpty, uniq } from "lodash";
import ProductContainerSortBox from "./SortBox";
import ProductContainerGrid from "./Grid";
import useToast from "@hooks/useToast";
import { productService } from "@services/index";
import { SortEnum } from "@constants/enumConstant";
import { useTranslation } from "react-i18next";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import ProductContainerTable from "./Table";
import { TableContentBodyEmptyItem } from "@common/Components";

const ProductContainer = ({ category }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState(null);
  const [productData, setProductData] = useState([]);
  const [sortParams, setSortParams] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await productService.getProducts({
        ...queryParams,
        category,
        sortParams: [
          {
            id: sortParams.key,
            desc: sortParams.value,
          },
        ],
      });

      setProductData(data);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [category, queryParams, sortParams.key, sortParams.value, t, toast]);

  const handleSort = useCallback((sort) => {
    setSortParams(sort);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const children = useMemo(() => {
    if (isLoading) {
      return <ProductContainerGridSkeleton />;
    }
    if (isEmpty(productData)) {
      return <TableContentBodyEmptyItem />;
    }
    return <ProductContainerGrid products={productData} isBorder />;
  }, [isLoading, productData]);

  return (
    <ContentWrapper className="section__container" bodyClassName="m-0">
      <ProductContainerTable
        data={productData}
        category={category}
        isLoading={isLoading}
        totalRows={totalRows}
        onChangeState={setQueryParams}
      >
        <div className="mb-6 flex items-center space-x-4">
          <div className="font-bold text-slate-700">{t("sort")}: </div>
          {uniq(Object.values(SortEnum)).map((item) => (
            <ProductContainerSortBox
              sortParams={sortParams}
              key={item.label}
              item={item}
              onSort={handleSort}
            />
          ))}
        </div>
        {children}
      </ProductContainerTable>
    </ContentWrapper>
  );
};
export default memo(ProductContainer);
