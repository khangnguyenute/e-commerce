import { memo } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineLink } from "react-icons/hi";

import TableRowAction from "./TableRowAction";

const TableRowActionGetLink = ({ id, isDisabled, onClick }) => {
  const { t } = useTranslation();

  return (
    <TableRowAction id={id} title={t("getLink")} isDisabled={isDisabled} onClick={onClick}>
      <HiOutlineLink size={17} className="text-gray-800 group-active:translate-y-px" />
    </TableRowAction>
  );
};

export default memo(TableRowActionGetLink);
