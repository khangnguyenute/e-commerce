import { memo } from "react";

const TableContentBodyColumnContent = ({ content, className }) => {
  return <div className={className}>{content}</div>;
};

export default memo(TableContentBodyColumnContent);
