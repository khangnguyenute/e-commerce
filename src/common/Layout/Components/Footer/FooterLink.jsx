import { memo } from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const FooterLink = ({ to, className, children }) => {
  return (
    <Link
      className={twMerge(
        "mb-2 flex cursor-pointer items-center duration-200 hover:text-primary-700",
        className,
      )}
      to={to}
    >
      <BiChevronRight className="-ml-1.5 mr-1" />
      <p>{children}</p>
    </Link>
  );
};

export default memo(FooterLink);
