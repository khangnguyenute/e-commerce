import { Logo } from "@common/Components/Logo";
import { isEmpty } from "lodash";
import { memo } from "react";
import { useSelector } from "react-redux";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderUserDropdown from "./HeaderUserDropdown";
import HeaderCart from "./HeaderCart";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const user = useSelector((state) => state.common.user);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="section__container grid grid-cols-3 items-center gap-4 bg-white p-4 md:grid-cols-6 md:bg-transparent">
        <Logo />
        <HeaderMenu />
        <div className="flex items-center justify-end space-x-2 lg:space-x-4">
          {isEmpty(user) && <HeaderLoginButton />}
          {!isEmpty(user) && (
            <div className="flex items-center gap-8">
              <HeaderUserDropdown />
            </div>
          )}
          <HeaderCart />
        </div>
      </div>
    </div>
  );
};
export default memo(Header);
