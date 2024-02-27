import { memo } from "react";

const ToastMessage = ({ message, description }) => {
  return (
    <div className="ml-3 flex flex-col">
      <div className="font-medium">{message}</div>
      <div className="text-sm font-light">{description}</div>
    </div>
  );
};
export default memo(ToastMessage);
