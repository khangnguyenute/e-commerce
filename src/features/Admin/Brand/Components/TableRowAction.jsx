import { TableRowActionDelete, TableRowActionEdit } from "@common/Components";
import { memo } from "react";

const AdminBrandTableRowAction = ({ id, onClickEdit, onClickDelete }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowActionEdit id={id} onClick={onClickEdit} />
      <TableRowActionDelete id={id} onClick={onClickDelete} />
    </div>
  );
};

export default memo(AdminBrandTableRowAction);
