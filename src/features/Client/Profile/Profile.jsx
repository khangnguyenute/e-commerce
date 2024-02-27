import { memo } from "react";
import ProfileRoutes from "./ProfileRoutes";
import ProfileSidebar from "./Sidebar/Sidebar";

const Profile = () => {
  return (
    <div className="mx-auto my-6 grid w-320 grid-cols-5 gap-6">
      <div className="col-span-1 rounded-lg border text-slate-700 shadow-xl">
        <ProfileSidebar />
      </div>
      <div className="col-span-4 rounded-lg border p-6 shadow-xl">
        <ProfileRoutes />
      </div>
    </div>
  );
};

export default memo(Profile);
