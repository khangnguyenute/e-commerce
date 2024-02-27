import { memo } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const classNamesByRole = {
  admin: "border-red-500 text-red-500",
  user: "border-blue-500 text-blue-500",
};

const AdminUserRole = ({ role = "user", className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={twMerge(
        "mx-auto w-fit rounded-full border-2 px-3 py-1 text-center text-sm",
        classNamesByRole[role],
        className,
      )}
    >
      {t(role)}
    </div>
  );
};
export default memo(AdminUserRole);
