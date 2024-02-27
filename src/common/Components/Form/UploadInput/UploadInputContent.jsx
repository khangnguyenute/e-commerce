import { cloneElement, memo } from "react";
import { FiUpload } from "react-icons/fi";
import { RxReload } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import UploadInputContentItem from "./UploadInputContentItem";

const UploadInputContent = ({
  isLoading,
  images,
  reviewedImages,
  className,
  classNameImage,
  maxImagesPerRow = 5,
  multiple,
  customizedUploadContent,
  onClickUploadImage,
  onClearImage,
}) => {
  if (customizedUploadContent) {
    return cloneElement(customizedUploadContent, {
      ...customizedUploadContent?.props,
      images,
      reviewedImages,
      isLoading,
      onClearImage,
      onClickUploadImage,
    });
  }

  return (
    <div
      className={twMerge("grid grid-cols-4 gap-4 rounded-lg", className)}
      style={{
        gridTemplateColumns: `repeat(${maxImagesPerRow}, minmax(0,1fr))`,
      }}
    >
      {Array.from(images).map((image, index) => {
        return (
          <UploadInputContentItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            image={image}
            className={classNameImage}
            onClearImage={onClearImage}
          />
        );
      })}
      {isLoading &&
        Array.from(reviewedImages).map((image, index) => {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={twMerge("relative aspect-4/3 w-full rounded-lg", classNameImage)}
            >
              <img
                src={image}
                alt="shop"
                className="h-full w-full rounded-lg object-cover object-center opacity-50"
              />
              <div className="absolute inset-0 m-auto h-4 w-4 animate-spin rounded-full border-2 border-t-gray-600" />
            </div>
          );
        })}
      <div
        role="button"
        tabIndex={0}
        className={twMerge(
          "flex aspect-4/3 w-full items-center justify-center rounded-lg border-2 border-dashed bg-white hover:bg-gray-50",
          classNameImage,
          !multiple && "col-span-full col-start-2",
        )}
        onClick={onClickUploadImage}
      >
        {multiple ? <FiUpload size={20} /> : <RxReload size={20} />}
      </div>
    </div>
  );
};

export default memo(UploadInputContent);
