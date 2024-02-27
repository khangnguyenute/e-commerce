import { memo } from "react";
import { twMerge } from "tailwind-merge";

import logoImage from "../../../assets/images/logo.png";
import { PROJECT_NAME } from "@constants/commonConstant";

const Logo = ({ className, imageClassName }) => {
  return (
    <div className={className}>
      {!logoImage && (
        <div
          className={twMerge("inline-flex h-12 w-40 animate-pulse rounded-none bg-gray-100", imageClassName)}
        />
      )}
      {logoImage && <img src={logoImage} alt={PROJECT_NAME} className={imageClassName} />}
    </div>
  );
};

export default memo(Logo);
