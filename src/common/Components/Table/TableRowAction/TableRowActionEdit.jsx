import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit2 } from "react-icons/fi";

import TableRowAction from "./TableRowAction";

const TableRowActionEdit = ({ id, isDisabled, onClick }) => {
  const { t } = useTranslation();

  return (
    <TableRowAction id={id} title={t("edit")} isDisabled={isDisabled} onClick={onClick}>
      <FiEdit2 />
    </TableRowAction>
  );
};

export default memo(TableRowActionEdit);
