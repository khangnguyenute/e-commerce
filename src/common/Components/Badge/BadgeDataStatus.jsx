import { memo, useMemo } from "react";

import Badge from "./Badge";

const BadgeDataStatus = ({ status, children }) => {
  const mappedStatus = useMemo(() => {
    if (status === "activated") {
      return "success";
    }

    return "danger";
  }, [status]);

  return <Badge status={mappedStatus}>{children}</Badge>;
};

export default memo(BadgeDataStatus);
