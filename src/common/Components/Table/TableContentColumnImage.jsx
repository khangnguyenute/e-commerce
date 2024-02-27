import { memo } from "react";

import { Avatar } from "../Avatar";
import TableContentColumnClickable from "./TableContentColumnClickable";

const TableContentColumnImage = ({ title, src, isClickable, onClick }) => {
  if (!title) return <div>-</div>;

  return (
    <TableContentColumnClickable isClickable={isClickable} onClick={onClick}>
      <Avatar src={src} alt={title} className="h-8 w-8 text-xs" />
      <span>{title}</span>
    </TableContentColumnClickable>
  );
};

export default memo(TableContentColumnImage);
