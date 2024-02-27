import { memo } from "react";

const ProfileOrderHistoryTablePriceColumn = ({ price, discount = 0 }) => {
  return (
    <div className="flex flex-col">
      <div className="text-primary-700">{Number(price) * (1 - Number(discount))}</div>
      {Boolean(Number(discount)) && <div className="line-through">{Number(price)}</div>}
    </div>
  );
};

export default memo(ProfileOrderHistoryTablePriceColumn);
