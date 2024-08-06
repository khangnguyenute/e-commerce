import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const HeaderUserDropdownItem = ({ path, children, className, onClick }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    onClick?.();
    if (path) {
      navigate(path);
    }
  }, [navigate, onClick, path]);

  return (
    <div
      className={twMerge(
        "group line-clamp-1 flex cursor-pointer gap-3 break-all text-sm hover:text-primary-500",
        className,
      )}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
export default memo(HeaderUserDropdownItem);
