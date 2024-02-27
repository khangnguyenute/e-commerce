import { memo } from "react";

import LayoutSidebarAdmin from "./Sidebar/Admin";
import { LayoutContainer } from "..";

const LayoutAdmin = ({ children }) => {
  return (
    <LayoutContainer sidebar={<LayoutSidebarAdmin className="hidden md:block" />} sidebarId={"adminSidebar"}>
      {children}
    </LayoutContainer>
  );
};

export default memo(LayoutAdmin);
