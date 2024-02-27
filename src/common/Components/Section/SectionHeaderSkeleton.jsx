import { memo } from "react";
import { LoadingSkeleton } from "../Loading";

const SectionHeaderSkeleton = ({ title, image }) => {
  return (
    <>
      {image && <LoadingSkeleton className="h-48 w-full" />}
      {title && <LoadingSkeleton className="mx-auto h-12 w-96" />}
    </>
  );
};

export default memo(SectionHeaderSkeleton);
