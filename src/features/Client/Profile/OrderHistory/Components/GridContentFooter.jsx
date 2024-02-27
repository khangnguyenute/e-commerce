import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { PROFILE_PATH } from "@constants/routeConstant";

const ProfileOrderHistoryGridContentFooter = ({ orderId, isDetailed, onClickBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tab } = useParams();

  const handleClick = useCallback(() => {
    if (!isDetailed) {
      navigate(PROFILE_PATH.ORDER_HISTORY_DETAIL(tab, orderId));
      return;
    }

    onClickBack(tab);
  }, [isDetailed, navigate, onClickBack, orderId, tab]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="mt-4 flex items-center text-blue-500 hover:text-blue-700"
      onClick={handleClick}
    >
      {isDetailed && (
        <>
          <BsChevronLeft />
          <span>{t("back")}</span>
        </>
      )}
      {!isDetailed && t("detail")}
    </div>
  );
};
export default memo(ProfileOrderHistoryGridContentFooter);
