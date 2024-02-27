import { LoadingSkeleton } from "@common/Components/Loading";
import { Children, memo, useCallback, useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

const SelectLegacy = ({
  defaultValue,
  className,
  children,
  postLabel,
  position = "bottomLeft",
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const selectRef = useRef(null);

  const getClassNameByPosition = useCallback((positionParam) => {
    switch (positionParam) {
      case "bottomLeft":
        return "left-0 top-10";
      case "bottomRight":
        return "right-0 top-11";
      case "topLeft":
        return `left-0 bottom-[${(selectRef.current?.offsetHeight || 0) + 8}px]`;
      case "topRight":
        return `right-0 bottom-[${(selectRef.current?.offsetHeight || 0) + 8}px]`;
      default:
        return "";
    }
  }, []);

  const handleClickSelect = useCallback(() => {
    setIsShowOptions((prev) => !prev);
  }, []);

  const handleSelectOption = useCallback(
    async (option) => {
      setSelectedOption(option);
      onChange?.(option.props.value);
    },
    [onChange],
  );

  useEffect(() => {
    let hasSelected = false;

    if (!children || typeof children !== "object") {
      return;
    }

    Children.forEach(children, (child) => {
      if (!child || typeof child !== "object") {
        return;
      }
      const { props } = child;
      if (props.value === defaultValue) {
        setSelectedOption(child);
        hasSelected = true;
      }
    });

    if (!hasSelected) {
      const firstChild = Children.toArray(children)[0];
      if (typeof firstChild !== "object") {
        return;
      }
      setSelectedOption(firstChild);
    }
  }, [children, defaultValue]);

  return (
    <button
      className={twMerge(
        "relative flex items-center justify-between",
        className,
        isShowOptions ? "z-10" : "z-0",
      )}
      type="button"
      ref={selectRef}
      onClick={handleClickSelect}
      onBlur={() => setIsShowOptions(false)}
    >
      {!selectedOption ? <LoadingSkeleton className="h-5 w-20" /> : selectedOption?.props?.children}
      {postLabel && <span className="ml-2">{postLabel}</span>}
      <BiChevronDown className="ml-2" />
      <div
        className={twMerge(
          "absolute w-fit min-w-full overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-0 py-3 text-left shadow-lg shadow-gray-100",
          getClassNameByPosition(position),
          !isShowOptions && "hidden",
        )}
      >
        {Children.map(children, (child) => (
          <div
            role="none"
            className={twMerge(selectedOption?.props?.value === child?.props?.value && "bg-gray-100")}
            onClick={() => handleSelectOption(child)}
          >
            {child}
          </div>
        ))}
      </div>
    </button>
  );
};

export default memo(SelectLegacy);
