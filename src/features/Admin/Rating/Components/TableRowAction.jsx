import { TableRowActionDelete, TableRowActionView } from "@common/Components";
import { memo } from "react";

const AdminRatingTableRowAction = ({ id, onClickView, onClickDelete }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowActionView id={id} onClick={onClickView} />
      <TableRowActionDelete id={id} onClick={onClickDelete} />
    </div>
  );
};

export default memo(AdminRatingTableRowAction);
