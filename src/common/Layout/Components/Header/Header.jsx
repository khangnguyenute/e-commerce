import { Logo } from "@common/Components/Logo";
import { isEmpty } from "lodash";
import { memo, useCallback, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderUserDropdown from "./HeaderUserDropdown";
import HeaderLanguageSelector from "./HeaderLanguageSelector";
import HeaderMenu from "./HeaderMenu";
import HeaderCart from "./HeaderCart";
import { CLIENT_PATH } from "@constants/routeConstant";

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.common.user);

  const isAdmin = useMemo(() => {
    if (!user) {
      return false;
    }
    return user.role === "admin";
  }, [user]);

  const handleClickLogo = useCallback(() => {
    navigate(CLIENT_PATH.HOME);
  }, [navigate]);

  const handleClickCart = useCallback(() => {
    navigate(CLIENT_PATH.CART);
  }, [navigate]);

  return (
    <div className="sticky top-0 z-50 h-20 w-full bg-white shadow-md" ref={headerRef}>
      <div className="mx-auto flex h-full w-320 justify-between">
        <div className="flex items-center justify-start">
          <div
            role="button"
            tabIndex={0}
            className="flex h-full flex-shrink-0 items-center"
            onClick={handleClickLogo}
          >
            <Logo imageClassName="h-full" className="h-14" />
          </div>
        </div>

        {!isAdmin && <HeaderMenu />}

        <div className="flex h-full w-fit items-center">
          {isEmpty(user) ? (
            <HeaderLoginButton />
          ) : (
            <div className="flex items-center gap-8">
              <HeaderUserDropdown />
            </div>
          )}
          {!isAdmin && (
            <div
              role="button"
              tabIndex={0}
              className="flex text-sm text-blue-500 hover:text-blue-700"
              onClick={handleClickCart}
            >
              <HeaderCart />
            </div>
          )}
          <HeaderLanguageSelector />
        </div>
      </div>
    </div>
  );
};
export default memo(Header);
