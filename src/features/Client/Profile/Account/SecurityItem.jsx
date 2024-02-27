import { memo } from "react";

const ProfileAccountSecurityItem = ({ icon, label, value, buttonContent, onUpdate }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-4">
        {icon}
        <div className="flex flex-col">
          <span>{label}</span>
          {value && <span>{value}</span>}
        </div>
      </div>
      <button
        onClick={onUpdate}
        className="rounded-lg border-2 border-blue-500 px-2 py-1 text-sm text-blue-500 hover:border-blue-700 hover:text-blue-700"
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default memo(ProfileAccountSecurityItem);
