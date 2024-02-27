import { memo } from "react";
import ProfileOrderHistoryGridContent from "./GridContent";

const ProfileOrderHistoryGrid = ({ orders }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {orders.map((order, index) => (
        <ProfileOrderHistoryGridContent key={index} order={order} />
      ))}
    </div>
  );
};
export default memo(ProfileOrderHistoryGrid);
