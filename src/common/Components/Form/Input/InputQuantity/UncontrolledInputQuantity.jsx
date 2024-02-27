import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import UncontrolledInputSkeleton from "../UncontrolledInputSkeleton";

const UncontrolledInputQuantity = (
  {
    value: valueProps,
    error,
    style,
    min,
    max,
    size,
    inlineError,
    isShowLabelWhenFocusing,
    isRequired,
    className,
    onChange,
    ...props
  },
  ref
) => {
  const [value, setValue] = useState(0);

  const sizeClassName = {
    container: "",
    size: 0,
    increase: "",
    decrease: "",
    input: "",
  };

  switch (size) {
    case "xs":
      sizeClassName.container = "h-7 w-7";
      sizeClassName.size = 16;
      sizeClassName.increase = "mb-0";
      sizeClassName.decrease = "mt-0";
      sizeClassName.input = "w-[calc(100%-1.75rem)]";
      break;
    case "sm":
      sizeClassName.container = "h-9 w-9";
      sizeClassName.size = 18;
      sizeClassName.increase = "mb-0";
      sizeClassName.decrease = "mt-0";
      sizeClassName.input = "w-[calc(100%-2rem)]";
      break;
    default:
      sizeClassName.container = "h-12 w-10";
      sizeClassName.size = 20;
      sizeClassName.increase = "mb-1";
      sizeClassName.decrease = "mt-1";
      sizeClassName.input = "w-[calc(100%-2.5rem)]";
  }

  const validateValue = useCallback(
    (number) => {
      if (number < Number(min)) {
        return Number(min);
      }
      if (number > Number(max)) {
        return Number(max);
      }
      return number;
    },
    [max, min]
  );

  const handleIncrease = useCallback(() => {
    if (value >= Number(max)) {
      return;
    }
    setValue((prev) => prev + 1);
    onChange?.(value + 1);
  }, [max, onChange, value]);

  const handleDecrease = useCallback(() => {
    if (value <= Number(min)) {
      return;
    }
    setValue((prev) => prev - 1);
    onChange?.(value - 1);
  }, [min, onChange, value]);

  useEffect(() => {
    setValue(validateValue(Number(valueProps)));
  }, [validateValue, valueProps]);

  return (
    <div className={twMerge("group relative", className)}>
      <UncontrolledInputSkeleton
        value={value ?? 0}
        type="number"
        error={error}
        style={style}
        size={size}
        className={className}
        classNameInput={sizeClassName.input}
        inlineError={inlineError}
        isShowLabelWhenFocusing={isShowLabelWhenFocusing}
        isRequired={isRequired}
        isAvailableValue={Boolean(value || value === 0)}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div
        className={twMerge(
          "absolute right-0.5 top-0.5 flex group-focus-within:z-20 group-hover:z-20",
          sizeClassName.container
        )}
      >
        <div className="my-0 border border-gray-100" />
        <div className="flex w-full flex-col justify-center divide-y-2">
          <div
            className="flex items-center justify-center text-gray-300 duration-100 hover:text-blue-500"
            role="button"
            tabIndex={0}
            onClick={handleIncrease}
          >
            <BiChevronUp
              size={sizeClassName.size}
              className={twMerge("mb-px mr-0.5", sizeClassName.increase)}
            />
          </div>
          <div
            className="flex items-center justify-center text-gray-300 duration-100 hover:text-blue-500"
            role="button"
            tabIndex={0}
            onClick={handleDecrease}
          >
            <BiChevronDown
              size={sizeClassName.size}
              className={twMerge("mr-px mt-0.5", sizeClassName.increase)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(forwardRef(UncontrolledInputQuantity));
