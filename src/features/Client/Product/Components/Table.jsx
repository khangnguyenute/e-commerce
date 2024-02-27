import { ProductPriceEnum } from "@constants/enumConstant";
import { brandService } from "@services/index";
import { createColumnHelper } from "@tanstack/react-table";
import { get, omit } from "lodash";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Table } from "@common/Components";
import { Star } from "@common/Components/Star";
import { DEFAULT_STAR } from "@constants/commonConstant";

const ProductContainerTable = ({
  data,
  category,
  isLoading,
  children,
  onClickEdit,
  onClickDelete,
  ...props
}) => {
  const { t } = useTranslation();

  const getPriceRange = useCallback(() => {
    return Object.values(ProductPriceEnum).map((price) => ({
      value: price.value,
      label: price.key,
    }));
  }, []);

  const getStars = useCallback(() => {
    return Array.from({ length: DEFAULT_STAR + 1 }).map((_, index) => ({
      value: index,
      label: <Star value={index} />,
    }));
  }, []);

  const getBrandsByCategory = useCallback(() => {
    return brandService.getBrands({ category });
  }, [category]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row._id, {
        id: "_id",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row.brand, {
        id: "price",
        header: t("price"),
        meta: {
          filterBy: "price",
          filterValueBy: "value",
          filterLabel: t("price"),
          filterType: "enum",
          getFilterOptions: getPriceRange,
          filterOptionLabelFactory: (option) => get(option, "label"),
        },
      }),
      columnHelper.accessor((row) => row.brand, {
        id: "brand",
        header: t("brand"),
        meta: {
          filterBy: "brand",
          filterValueBy: "name",
          filterLabel: t("brand"),
          getFilterOptions: getBrandsByCategory,
          filterOptionLabelFactory: (option) => get(option, "name"),
        },
      }),
      columnHelper.accessor((row) => row.star, {
        id: "star",
        header: t("star"),
        cell: (props) => <Star value={props.row.original.star} />,
        meta: {
          filterBy: "star",
          filterValueBy: "value",
          filterLabel: t("star"),
          filterType: "enum",
          getFilterOptions: getStars,
          filterOptionLabelFactory: (option) => get(option, "label"),
        },
      }),
    ],
    [columnHelper, getBrandsByCategory, getPriceRange, getStars, t],
  );

  const searchGroup = useMemo(
    () => [
      {
        key: "information",
        label: t("information"),
        field: {
          name: t("name"),
        },
      },
    ],
    [t],
  );

  return (
    <Table
      data={data}
      columns={columns}
      searchGroup={searchGroup}
      isLoading={isLoading}
      {...omit(props, "columns")}
    >
      {children}
    </Table>
  );
};

export default memo(ProductContainerTable);
