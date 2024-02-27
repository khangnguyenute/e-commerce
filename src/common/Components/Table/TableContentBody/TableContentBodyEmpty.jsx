import { memo } from "react";

import TableContentBodyEmptyItem from "./TableContentBodyEmptyItem";

const TableContentBodyEmpty = ({ columns }) => {
  return (
    <tr>
      <td colSpan={columns}>
        <TableContentBodyEmptyItem />
      </td>
    </tr>
  );
};

export default memo(TableContentBodyEmpty);
