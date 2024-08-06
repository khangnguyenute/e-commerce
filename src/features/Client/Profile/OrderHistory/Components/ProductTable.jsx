import { createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "@common/Components";
import { omit } from "lodash";
import ProfileOrderHistoryTableTotalColumn from "./TableTotalColumn";
import ProfileOrderHistoryTablePriceColumn from "./TablePriceColumn";

const ProfileOrderHistoryProductTable = ({ data, isLoading, children, ...props }) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper(), []);

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.id, {
        id: "id",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row.image, {
        id: "image",
        header: t("image"),
        cell: (props) => (
          <div className="h-16 max-w-24 object-cover">
            <img src={props.row.original.image} alt={props.row.original.name} className="mx-auto h-full" />
          </div>
        ),
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: t("name"),
        cell: (props) => <div className="w-80">{props.row.original.name}</div>,
      }),
      columnHelper.accessor((row) => row.price, {
        id: "price",
        header: t("price"),
        cell: (props) => (
          <ProfileOrderHistoryTablePriceColumn
            price={props.row.original.price}
            discount={props.row.original.discount}
            quantity={props.row.original.quantity}
          />
        ),
      }),
      columnHelper.accessor((row) => row.quantity, {
        id: "quantity",
        header: t("quantity"),
      }),
      columnHelper.display({
        id: "total",
        header: t("total"),
        cell: (props) => (
          <ProfileOrderHistoryTableTotalColumn
            price={props.row.original.price}
            discount={props.row.original.discount}
            quantity={props.row.original.quantity}
          />
        ),
      }),
    ],
    [columnHelper, t],
  );

  const columnVisibility = useMemo(() => {
    return {
      selector: false,
      id: false,
    };
  }, []);

  return (
    <Table
      data={data}
      columns={columns}
      columnVisibility={columnVisibility}
      isLoading={isLoading}
      isShowHeader={false}
      isShowFooter={false}
      {...omit(props, "columns")}
    >
      {children}
    </Table>
  );
};

export default memo(ProfileOrderHistoryProductTable);
