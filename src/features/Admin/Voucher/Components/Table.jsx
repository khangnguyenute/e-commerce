import { createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import AdminVoucherTableRowAction from "./TableRowAction";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Table } from "@common/Components";
import { omit } from "lodash";

const AdminVoucherTable = ({ data, isLoading, onClickEdit, onClickDelete, ...props }) => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.voucherId, {
        id: "voucherId",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: t("name"),
      }),
      columnHelper.accessor((row) => row.title, {
        id: "title",
        header: t("title"),
      }),
      columnHelper.accessor((row) => row.quantity, {
        id: "quantity",
        header: t("quantity"),
      }),
      columnHelper.accessor((row) => row.expiredDate, {
        id: "expiredDate",
        header: t("expiredDate"),
        cell: (props) => <div>{dayjs(props.row.original.expiredDate).format("YYYY/MM/DD")}</div>,
        meta: {
          filterBy: "rangeDate",
          filterType: "rangeDate",
          filterLabel: t("expiredDate"),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.sale, {
        id: "sale",
        header: t("sale"),
        cell: (props) => Number(props.row.original.sale) + "%",
      }),
      columnHelper.accessor((row) => row.redeemUse, {
        id: "redeemUse",
        header: t("redeemUse"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminVoucherTableRowAction
            id={props.row.original.voucherId}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        ),
      }),
    ],
    [columnHelper, onClickDelete, onClickEdit, t],
  );

  const searchGroup = useMemo(
    () => [
      {
        key: "information",
        label: t("information"),
        field: {
          name: t("name"),
          title: t("title"),
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

export default memo(AdminVoucherTable);
