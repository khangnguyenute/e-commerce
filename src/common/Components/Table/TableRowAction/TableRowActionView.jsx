import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiEye } from "react-icons/fi";

import TableRowAction from "./TableRowAction";

const TableRowActionView = ({ id, isDisabled, onClick }) => {
  const { t } = useTranslation();

  return (
    <TableRowAction id={id} title={t("view")} isDisabled={isDisabled} onClick={onClick}>
      <FiEye />
    </TableRowAction>
  );
};

export default memo(TableRowActionView);
