import { createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import AdminCategoryTableRowAction from "./TableRowAction";
import { Table } from "@common/Components";
import { omit } from "lodash";

const AdminCategoryTable = ({ data, isLoading, onClickEdit, onClickDelete, ...props }) => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row._id, {
        id: "_id",
        header: t(t("id")),
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: t("name"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminCategoryTableRowAction
            id={props.row.original._id}
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

export default memo(AdminCategoryTable);
