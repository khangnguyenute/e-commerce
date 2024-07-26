import { memo } from "react";
import { twMerge } from "tailwind-merge";
import SectionHeaderSkeleton from "./SectionHeaderSkeleton";
import SectionHeader from "./SectionHeader";

const Section = ({ isLoading, title, image, className = "bg-transparent", children }) => {
  return (
    <div className={twMerge("flex flex-col space-y-4 rounded-xl py-8", className)}>
      {isLoading && <SectionHeaderSkeleton title={title} image={image} />}
      {!isLoading && <SectionHeader title={title} image={image} />}
      {children}
    </div>
  );
};

export default memo(Section);
