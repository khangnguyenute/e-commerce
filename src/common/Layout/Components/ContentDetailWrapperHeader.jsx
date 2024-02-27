import { Button } from "@common/Components";
import { memo } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FiSave } from "react-icons/fi";

const ContentDetailWrapperHeader = ({
  title,
  titleButton,
  isAllowSubmit,
  isSubmitting,
  icon,
  children,
  onClickBack,
  onConfirm,
}) => {
  return (
    <div className="flex h-20 justify-between border-b border-gray-200 bg-white px-4 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div
          role="button"
          tabIndex={0}
          onClick={onClickBack}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-gray-500 shadow-sm hover:border-gray-400 hover:text-gray-600"
        >
          <BiArrowBack size={23} />
        </div>
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          className="my-auto h-fit px-2 lg:px-4"
          size="sm"
          disabled={!isAllowSubmit}
          onClick={onConfirm}
          isLoading={isSubmitting}
        >
          {icon || <FiSave size={20} />}
          <span className="hidden lg:block">{titleButton}</span>
        </Button>
        {children}
      </div>
    </div>
  );
};

export default memo(ContentDetailWrapperHeader);
