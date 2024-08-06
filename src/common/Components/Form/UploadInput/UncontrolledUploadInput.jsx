import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import EmptyUploadInput from "./EmptyUploadInput";
import UploadInputContent from "./UploadInputContent";
import useToast from "@hooks/useToast";
import { uploadService } from "@services/index";
import { getImageURLFromFile } from "@utils/Helpers";

const UncontrolledUploadInput = ({
  className,
  classNameContent,
  classNameImage,
  classNameEmpty,
  maxImagesPerRow,
  error,
  inlineError = false,
  multiple,
  value,
  label,
  disabled = false,
  placeholder,
  customizedUploadEmpty,
  customizedUploadContent,
  onChange,
  ...props
}) => {
  const { t } = useTranslation();
  const toast = useToast();

  const inputFileRef = useRef();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewedImages, setReviewedImages] = useState([]);
  const isFirstRender = useRef(true);

  const handleClickUploadImage = useCallback(() => {
    const inputFileElement = inputFileRef.current;
    inputFileElement.click();
  }, []);

  const handleChangeImage = useCallback(
    async (imageFile) => {
      setIsLoading(true);
      if (!multiple) {
        setImages?.([]);
      }

      try {
        const image = await uploadService.uploadImage(imageFile);
        const newFileData = image;

        if (multiple) {
          setImages((prev) => [...prev, newFileData.url]);
          isFirstRender.current = false;
          return;
        }
        onChange?.(newFileData.url);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(t("uploadError"));
        }
      } finally {
        setIsLoading(false);
        setReviewedImages([]);
      }
    },
    [multiple, onChange, t, toast],
  );

  const handleChooseImage = useCallback(
    (e) => {
      const filesInput = e.target.files;
      if (filesInput === null) {
        return;
      }

      Array.from(filesInput).forEach((imageFile) => {
        setReviewedImages((prev) => [...prev, getImageURLFromFile(imageFile)]);
        handleChangeImage(imageFile);
      });
    },

    [handleChangeImage],
  );

  const handleClearImage = useCallback(
    (e, image) => {
      e.preventDefault();
      e.stopPropagation();

      setImages((prev) => prev.filter((imageItem) => imageItem !== image));
      if (multiple) {
        onChange?.(images.filter((imageItem) => imageItem !== image));
        return;
      }
      onChange?.("");
    },
    [images, multiple, onChange],
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      onChange?.(images);
    }
  }, [images, onChange]);

  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }

    if (!value || isEmpty(value)) {
      setImages([]);
      return;
    }
    setImages(Array.isArray(value) ? value : [value]);
  }, [value]);

  return (
    <div
      className={twMerge(
        "relative block cursor-text bg-white transition-colors duration-200",
        label && "rounded-lg border-2 border-gray-100 px-4 py-4 ring-inset hover:border-blue-500",
        label && error && "cursor-default bg-gray-50 ring-gray-100 hover:border-gray-100",
      )}
    >
      {label && (
        <div
          className={twMerge(
            "absolute left-2 top-1.5 z-10 -mt-0.5 flex -translate-y-4 items-center justify-between bg-white px-2 text-sm font-semibold text-blue-500 transition-all duration-200",
            disabled && "text-gray-400",
          )}
        >
          <div className="absolute inset-y-0 left-0 top-1/2 -z-30 w-full -translate-y-0.5" />
          {label}
        </div>
      )}
      <div className={twMerge("block w-full cursor-pointer text-left outline-none", className)}>
        <input
          type="file"
          className="hidden"
          name="input_file"
          ref={inputFileRef}
          multiple={multiple}
          onChange={handleChooseImage}
          {...props}
        />
        <div className="h-full w-full">
          {images?.length > 0 || isLoading ? (
            <UploadInputContent
              isLoading={isLoading}
              images={images}
              reviewedImages={reviewedImages}
              className={classNameContent}
              classNameImage={classNameImage}
              maxImagesPerRow={maxImagesPerRow}
              multiple={multiple}
              customizedUploadContent={customizedUploadContent}
              onClearImage={handleClearImage}
              onClickUploadImage={handleClickUploadImage}
            />
          ) : (
            <EmptyUploadInput
              className={classNameEmpty}
              placeholder={placeholder}
              customizedUploadEmpty={customizedUploadEmpty}
              onClickUploadImage={handleClickUploadImage}
            />
          )}
        </div>
      </div>
      {!inlineError && Boolean(error) && <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default memo(UncontrolledUploadInput);
