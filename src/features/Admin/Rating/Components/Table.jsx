import { createColumnHelper } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { get, omit } from "lodash";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import AdminRatingTableDiscussColumn from "./TableDiscussColumn";
import AdminRatingTableRowAction from "./TableRowAction";
import { Table } from "@common/Components";
import { Star } from "@common/Components/Star";
import { DEFAULT_STAR } from "@constants/commonConstant";

const AdminRatingTable = ({ data, isLoading, onClickView, onClickDelete, ...props }) => {
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
      columnHelper.accessor((row) => row.product.name, {
        id: "product",
        header: t("product"),
      }),
      columnHelper.accessor((row) => row.user?.email ?? "", {
        id: "user",
        header: t("email"),
      }),
      columnHelper.accessor((row) => row.content, {
        id: "content",
        header: t("content"),
        cell: (props) => <div className="whitespace-normal break-words">{props.row.original.content}</div>,
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
      columnHelper.accessor((row) => row.discuss, {
        id: "discuss",
        header: t("discuss"),
        cell: (props) => <AdminRatingTableDiscussColumn selectedRating={props.row.original} />,
      }),
      columnHelper.accessor((row) => row.createdAt, {
        id: "createdAt",
        header: t("createdAt"),
        cell: (props) => (
          <>
            <div>{dayjs(props.row.original.createdAt).format("M/D/YYYY")}</div>
            <div>{dayjs(props.row.original.createdAt).format("h:mm A")}</div>
          </>
        ),
        meta: {
          filterBy: "rangeDate",
          filterType: "rangeDate",
          filterLabel: t("createdAt"),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.updatedAt, {
        id: "updatedAt",
        header: t("updatedAt"),
        cell: (props) => (
          <>
            <div>{dayjs(props.row.original.updatedAt).format("M/D/YYYY")}</div>
            <div>{dayjs(props.row.original.updatedAt).format("h:mm A")}</div>
          </>
        ),
        meta: {
          filterBy: "rangeDate",
          filterType: "rangeDate",
          filterLabel: t("updatedAt"),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminRatingTableRowAction
            id={props.row.original._id}
            onClickView={onClickView}
            onClickDelete={onClickDelete}
          />
        ),
      }),
    ],
    [columnHelper, t, getStars, onClickView, onClickDelete],
  );

  const searchGroup = useMemo(
    () => [
      {
        key: "information",
        label: t("information"),
        field: {
          product: t("product"),
          user: t("email"),
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

export default memo(AdminRatingTable);
