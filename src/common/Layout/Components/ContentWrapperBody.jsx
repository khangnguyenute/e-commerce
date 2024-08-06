import { twMerge } from "tailwind-merge";

const LayoutContentWrapperBody = ({ isBlank, isTab = false, isBorder = true, children, className }) => {
  return (
    <div
      className={twMerge(
        !isBlank && "m-4 rounded-lg border-2 bg-white p-4 shadow-base md:p-4",
        !className && "border-0 p-0 shadow-none lg:border-2 lg:p-6 lg:shadow-base",
        isBlank && isBorder && "border-t-2",
        isTab && "m-4 rounded-t-none",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LayoutContentWrapperBody;
