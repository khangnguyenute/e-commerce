import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "@constants/routeConstant";

const HeaderMenuItem = ({ title, link, icon }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (!link) {
      navigate(CLIENT_PATH.HOME);
      return;
    }
    navigate(CLIENT_PATH.PRODUCT(link));
  }, [link, navigate]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex items-center space-x-1 text-slate-700 hover:text-blue-700"
      onClick={handleClick}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default memo(HeaderMenuItem);
