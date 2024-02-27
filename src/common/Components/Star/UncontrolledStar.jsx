import { DEFAULT_STAR } from "@constants/commonConstant";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import UncontrolledStarItem from "./UncontrolledStarItem";

const UncontrolledStar = ({ value, className, disabled = false, onChange, starClassName }) => {
  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      {Array.from({ length: DEFAULT_STAR }).map((_, index) => (
        <UncontrolledStarItem
          key={index}
          index={index}
          star={value}
          disabled={disabled}
          starClassName={starClassName}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default memo(UncontrolledStar);
