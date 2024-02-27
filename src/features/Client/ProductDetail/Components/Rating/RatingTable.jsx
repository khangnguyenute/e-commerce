import { createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "@common/Components";
import { omit } from "lodash";

const ProductDetailRatingTable = ({ data, isLoading, children, ...props }) => {
  const { t } = useTranslation();

  const columnHelper = useMemo(() => createColumnHelper(), []);

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row._id, {
        id: "_id",
        header: t("id"),
      }),
    ],
    [columnHelper, t],
  );

  return (
    <Table data={data} columns={columns} isLoading={isLoading} {...omit(props, "columns")}>
      {children}
    </Table>
  );
};

export default memo(ProductDetailRatingTable);
