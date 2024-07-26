import { memo, useCallback } from "react";

import logoImage from "../../../assets/images/logo.png";
import { PROJECT_NAME } from "@constants/commonConstant";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "@constants/routeConstant";

const Logo = () => {
  const navigate = useNavigate();

  const handleClickLogo = useCallback(() => {
    navigate(CLIENT_PATH.HOME);
  }, [navigate]);

  return (
    <div role="button" tabIndex={0} onClick={handleClickLogo}>
      {!logoImage && <div className="h-12 w-40 animate-pulse rounded-none bg-gray-100" />}
      {logoImage && (
        <div>
          <img src={logoImage} alt={PROJECT_NAME} className="h-14" />
        </div>
      )}
    </div>
  );
};

export default memo(Logo);
