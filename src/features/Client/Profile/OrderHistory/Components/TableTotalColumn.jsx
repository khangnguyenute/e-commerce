import { memo } from "react";

const ProfileOrderHistoryTableTotalColumn = ({ price, discount = 0, quantity }) => {
  return <div className="text-primary-500">{Number(price) * (1 - Number(discount)) * Number(quantity)}</div>;
};

export default memo(ProfileOrderHistoryTableTotalColumn);
