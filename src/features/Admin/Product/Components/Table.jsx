import { ProductPriceEnum } from "@constants/enumConstant";
import { brandService, categoryService } from "@services/index";
import { createColumnHelper } from "@tanstack/react-table";
import { get, omit, uniq } from "lodash";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AdminProductTableRowAction from "./TableRowAction";
import { Avatar, Table } from "@common/Components";
import { Star } from "@common/Components/Star";
import { DEFAULT_STAR } from "@constants/commonConstant";

const AdminProductTable = ({ data, isLoading, onClickEdit, onClickDelete, ...props }) => {
  const { t } = useTranslation();

  const getStars = useCallback(() => {
    return Array.from({ length: DEFAULT_STAR + 1 }).map((_, index) => ({
      value: index,
      label: <Star value={index} />,
    }));
  }, []);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row._id, {
        id: "_id",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row.image, {
        id: "image",
        header: t("image"),
        cell: (props) => (
          <Avatar src={props.row.original.image} alt={props.row.original.name} className="rounded-md" />
        ),
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: t("name"),
        cell: (props) => <div className="min-w-[150px]">{props.row.original.name}</div>,
      }),
      columnHelper.accessor((row) => row.price, {
        id: "price",
        header: t("price"),
        meta: {
          filterBy: "key",
          customFilterBy: "price",
          filterChange: "value",
          filterLabel: t("price"),
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(ProductPriceEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.category, {
        id: "category",
        header: t("category"),
        meta: {
          filterBy: "name",
          customFilterBy: "category",
          filterLabel: t("category"),
          filterOptionLabelFactory: (option) => String(option),
          getFilterOptions: categoryService.getCategories,
        },
      }),
      columnHelper.accessor((row) => row.brand, {
        id: "brand",
        header: t("brand"),
        meta: {
          filterBy: "name",
          customFilterBy: "brand",
          filterLabel: t("brand"),
          filterOptionLabelFactory: (option) => String(option),
          getFilterOptions: brandService.getBrands,
        },
      }),
      columnHelper.accessor((row) => row.discount, {
        id: "discount",
        header: t("discount"),
        cell: (props) => props.row.original.discount + "%",
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
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminProductTableRowAction
            id={props.row.original._id}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        ),
      }),
    ],
    [columnHelper, getStars, onClickDelete, onClickEdit, t],
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
    />
  );
};

export default memo(AdminProductTable);
