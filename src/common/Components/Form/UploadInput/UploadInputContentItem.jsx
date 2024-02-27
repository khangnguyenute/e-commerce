import { memo, useCallback } from "react";
import { FiTrash2 } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const UploadInputContentItem = ({ image, className, onClearImage }) => {
  const handleClearImage = useCallback(
    (e) => {
      onClearImage(e, image);
    },
    [image, onClearImage],
  );

  return (
    <div className={twMerge("group relative aspect-4/3 h-full w-full rounded-lg", className)}>
      <img
        src={image}
        alt="shop"
        className="aspect-4/3 h-full w-full rounded-lg object-cover object-center"
      />
      <div
        role="button"
        tabIndex={0}
        className="invisible absolute top-0 flex h-full w-full items-center justify-center rounded-lg bg-gray-100 text-red-500 opacity-70 group-hover:visible"
        onClick={handleClearImage}
      >
        <FiTrash2 size={22} />
      </div>
    </div>
  );
};

export default memo(UploadInputContentItem);
