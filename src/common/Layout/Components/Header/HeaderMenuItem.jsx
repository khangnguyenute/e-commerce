import { memo, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "@constants/routeConstant";
import { twMerge } from "tailwind-merge";

const HeaderMenuItem = ({ title, link, icon }) => {
  const navigate = useNavigate();
  const path = useLocation();

  const isActived = useMemo(() => path.pathname.slice(1) === link, [link, path.pathname]);

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
      className={twMerge(
        "flex items-center space-x-1 font-medium text-slate-700 duration-200 hover:text-blue-700",
        isActived && "text-blue-700",
      )}
      onClick={handleClick}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default memo(HeaderMenuItem);
