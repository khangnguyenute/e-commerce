import { memo, useCallback } from "react";
import ProfileOrderHistoryGridContentFooter from "./GridContentFooter";
import ProfileOrderHistoryGridContentHeader from "./GridContentHeader";
import { PROFILE_PATH } from "@constants/routeConstant";
import { useNavigate } from "react-router-dom";
import ProfileOrderHistoryGridContentBody from "./GridContentBody";

const ProfileOrderHistoryGridContent = ({ order, isDetailed }) => {
  const navigate = useNavigate();

  const handleClickBack = useCallback(
    (tab) => {
      navigate(PROFILE_PATH.ORDER_HISTORY_TAB(tab));
    },
    [navigate],
  );

  return (
    <div className="flex flex-col space-y-4 rounded-xl border bg-white p-6 shadow-base">
      <ProfileOrderHistoryGridContentHeader order={order} onClickBack={handleClickBack} />

      <ProfileOrderHistoryGridContentBody order={order} isDetailed={isDetailed} />

      <ProfileOrderHistoryGridContentFooter
        orderId={order._id}
        isDetailed={isDetailed}
        onClickBack={handleClickBack}
      />
    </div>
  );
};
export default memo(ProfileOrderHistoryGridContent);
