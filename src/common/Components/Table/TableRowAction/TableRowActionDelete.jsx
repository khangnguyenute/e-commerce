import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiTrash2 } from "react-icons/fi";

import TableRowAction from "./TableRowAction";

const TableRowActionDelete = ({ id, isDisabled, onClick }) => {
  const { t } = useTranslation();

  return (
    <TableRowAction
      id={id}
      title={t("delete")}
      isDisabled={isDisabled}
      status="danger"
      onClick={onClick}
    >
      <FiTrash2 />
    </TableRowAction>
  );
};

export default memo(TableRowActionDelete);
