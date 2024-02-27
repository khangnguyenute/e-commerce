import { memo } from "react";
import TableHeaderFilter from "./TableHeaderFilter";

const TableHeaderFilterGroup = ({
  id,
  tableFilterRef,
  filterClassName,
  headers,
  onChangeFilters,
}) => {
  return (
    <>
      {headers.map((header, index) => (
        <TableHeaderFilter
          id={id}
          key={header.id}
          className={filterClassName}
          header={header}
          onChangeFilters={onChangeFilters}
          ref={tableFilterRef.current[index]}
        />
      ))}
    </>
  );
};

export default memo(TableHeaderFilterGroup);
