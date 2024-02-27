import { createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import OrderTableRowAction from "./OrderTableRowAction";
import { Table } from "../../../../Components/Table";
import OrderStatus from "./OrderStatus";
import dayjs from "dayjs";
import { uniq } from "lodash";
import { OrderStatusEnum, OrderTotalPriceEnum } from "../../../Constants";
import { useTranslation } from "react-i18next";

const OrderTable = ({
  data,
  isLoading,
  rows,
  onChangeState,
  onClickView,
  onClickEdit,
}) => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row._id, {
        id: "_id",
        header: t(t("id")),
      }),
      columnHelper.accessor((row) => row.totalQuantity, {
        id: "totalQuantity",
        header: t("quantity"),
      }),
      columnHelper.accessor((row) => row.totalPrice, {
        id: "totalPrice",
        header: t("totalPrice"),
        meta: {
          filterBy: "key",
          customFilterBy: "totalPrice",
          filterChange: "value",
          filterLabel: t("totalPrice"),
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(OrderTotalPriceEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.status, {
        id: "status",
        header: t("status"),
        cell: (props) => <OrderStatus status={props.row.original.status} />,
        meta: {
          filterBy: "status",
          filterLabel: t("status"),
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(OrderStatusEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
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
          <OrderTableRowAction
            id={props.row.original._id}
            onClickView={onClickView}
            onClickEdit={onClickEdit}
          />
        ),
      }),
    ],
    [columnHelper, onClickView, onClickEdit]
  );

  return (
    <Table
      data={data}
      columns={columns}
      isLoading={isLoading}
      totalRows={rows}
      onChangeState={onChangeState}
    />
  );
};

export default memo(OrderTable);
