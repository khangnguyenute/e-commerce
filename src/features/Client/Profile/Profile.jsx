import { memo } from "react";
import ProfileRoutes from "./ProfileRoutes";
import ProfileSidebar from "./Sidebar/Sidebar";

const Profile = () => {
  return (
    <div className="section__container grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5">
      <ProfileSidebar className="col-span-1" />
      <div className="col-span-1 md:col-span-3 lg:col-span-4">
        <ProfileRoutes />
      </div>
    </div>
  );
};

export default memo(Profile);
