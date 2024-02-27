import { cloneElement, memo } from "react";
import { FiUpload } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const EmptyUploadInput = ({
  className,
  placeholder,
  customizedUploadEmpty,
  onClickUploadImage,
}) => {
  if (customizedUploadEmpty) {
    return cloneElement(customizedUploadEmpty, {
      ...customizedUploadEmpty?.props,
      placeholder,
      onClickUploadImage,
    });
  }
  return (
    <div
      role="button"
      tabIndex={0}
      className={twMerge(
        "flex items-center justify-center space-x-4 border-2 border-dashed bg-white hover:bg-gray-50",
        className
      )}
      onClick={onClickUploadImage}
    >
      <FiUpload size={24} />
      <div>{placeholder}</div>
    </div>
  );
};
export default memo(EmptyUploadInput);
