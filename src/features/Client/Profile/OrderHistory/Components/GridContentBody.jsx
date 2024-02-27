import { memo } from "react";
import ProfileOrderHistoryProductTable from "./ProductTable";
import ProfileOrderHistoryGridContentBodyInformation from "./GridContentBodyInformation";
import ProfileOrderHistoryGridContentBodyTotal from "./GridContentBodyTotal";

const ProfileOrderHistoryGridContentBody = ({ order, isDetailed }) => {
  return (
    <>
      {isDetailed && <ProfileOrderHistoryGridContentBodyInformation order={order} />}

      <ProfileOrderHistoryProductTable data={order.orderItems} />

      <ProfileOrderHistoryGridContentBodyTotal order={order} />
    </>
  );
};
export default memo(ProfileOrderHistoryGridContentBody);
