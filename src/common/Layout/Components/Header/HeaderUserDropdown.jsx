import { Avatar, Dropdown } from "@common/Components";
import { memo } from "react";

import { useSelector } from "react-redux";
import HeaderUserDropdownMenu from "./HeaderUserDropdownMenu";

const HeaderUserDropdown = () => {
  const user = useSelector((state) => state.common.user);

  return (
    <div className="h-10 w-10 rounded-full shadow-md">
      <Dropdown menu={<HeaderUserDropdownMenu />}>
        <Avatar src={user?.avatar} alt={user?.email} className="h-10 w-10" imageClassName="h-10 w-10" />
      </Dropdown>
    </div>
  );
};
export default memo(HeaderUserDropdown);
