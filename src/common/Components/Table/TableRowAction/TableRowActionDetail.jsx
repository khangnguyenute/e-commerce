import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TbListDetails } from "react-icons/tb";

import TableRowAction from "./TableRowAction";

const TableRowActionDetail = ({ id, isDisabled, onClick }) => {
  const { t } = useTranslation();

  return (
    <TableRowAction id={id} title={t("detail")} isDisabled={isDisabled} onClick={onClick}>
      <TbListDetails />
    </TableRowAction>
  );
};

export default memo(TableRowActionDetail);
