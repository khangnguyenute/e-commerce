import { memo } from "react";
import { twMerge } from "tailwind-merge";

const FooterSocial = ({ href = "#", icon, className }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={twMerge(
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-lg shadow-md duration-200 hover:text-white",
        className,
      )}
    >
      {icon}
    </a>
  );
};

export default memo(FooterSocial);
