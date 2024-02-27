import TableRowActionView from "../../../../Components/Table/TableRowAction/TableRowActionView";
import TableRowActionEdit from "../../../../Components/Table/TableRowAction/TableRowActionEdit";
import { memo } from "react";

const OrderTableRowAction = ({ id, onClickView, onClickEdit }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowActionView id={id} onClick={onClickView} />
      <TableRowActionEdit id={id} onClick={onClickEdit} />
    </div>
  );
};

export default memo(OrderTableRowAction);
