import { debounce, isEqual, isFunction } from "lodash";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import ReactSelect from "react-select";
import { twMerge } from "tailwind-merge";
import DropdownIndicator from "./DropdownIndicator";
import { DEFAULT_API_DEBOUNCE_TIME } from "@constants/commonConstant";

const UncontrolledSelect = ({
  error,
  placeholder,
  classNameError,
  classNameSelect,
  isDisabled = false,
  isRequired = false,
  isMulti,
  isLoading,
  value,
  options,
  className,
  onInputChange: onSearchInputChange,
  onChange: onChangeSelect,
  onBlur,
  ...props
}) => {
  const [isFocusing, setIsFocusing] = useState(false);
  const borderColor = twMerge(isFocusing ? "border-blue-500 z-20" : "border-gray-100");

  const selectRef = useRef(null);
  const selectedOptions = useMemo(() => {
    if (!value) {
      return null;
    }

    if (isMulti) {
      return value;
    }

    return options?.find((option) => {
      if (option && typeof option === "object" && "value" in option) {
        return isEqual(option.value, value);
      }

      return option === value;
    });
  }, [isMulti, options, value]);

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: isDisabled ? "border-gray-100" : "bg-white",
      border: "none",
      outline: "none",
      boxShadow: "none ",
      transform: "translateX(10px)",
    }),
    multiValue: (provided) => ({
      ...provided,
      background: "#f3f4f6",
      borderRadius: "8px",
      padding: 0,
      margin: 2,
    }),
  };

  const handleChangeInputValue = debounce((inputValue, actionMeta) => {
    onSearchInputChange?.(inputValue, actionMeta);
  }, DEFAULT_API_DEBOUNCE_TIME);

  const handleChangeOnFocus = useCallback(() => {
    if (!isDisabled) setIsFocusing(true);
  }, [isDisabled]);

  const handleBlur = useCallback(
    (e) => {
      if (!isDisabled) setIsFocusing(false);
      if (isFunction(onBlur)) onBlur(e);
    },
    [isDisabled, onBlur],
  );

  const handleChange = useCallback(
    (newValue, actionMeta) => {
      onChangeSelect?.(newValue, actionMeta);
      if (actionMeta.action === "select-option" && !isMulti) setIsFocusing(false);
    },
    [isMulti, onChangeSelect],
  );

  const components = useMemo(() => ({ ...(isLoading && { DropdownIndicator }) }), [isLoading]);

  return (
    <div className={twMerge("group", className)}>
      <div
        ref={selectRef}
        className={twMerge(
          borderColor,
          "relative min-h-13 w-full rounded-lg border-2 px-3.5 pb-0.5 pt-1 group-focus-within:border-blue-500",
          isDisabled && "bg-gray-100",
          error && "border-red-500",
          classNameSelect,
        )}
      >
        <div
          className={twMerge(
            "absolute left-2 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between bg-white px-2 text-gray-500 transition-all duration-200 group-focus-within:border-blue-500",
            isFocusing && "-top-0.5 text-sm font-semibold text-blue-500",
            !isLoading && Boolean(value) && "-top-0.5 text-sm font-semibold text-blue-500",
            error && "text-red-500",
            isDisabled && "bg-transparent text-gray-400",
          )}
          role="button"
          tabIndex={-1}
          onFocus={handleChangeOnFocus}
          onBlur={handleBlur}
        >
          {placeholder}
          {isRequired && (
            <div className="absolute -right-2.5 w-3.5 bg-inherit text-lg font-normal text-red-500">*</div>
          )}
        </div>
        <ReactSelect
          value={selectedOptions}
          options={options}
          menuIsOpen={isFocusing}
          styles={customStyles}
          onMenuOpen={handleChangeOnFocus}
          isDisabled={isDisabled}
          isMulti={isMulti}
          className="react-select"
          classNamePrefix="react-select"
          placeholder=""
          onBlur={handleBlur}
          onChange={handleChange}
          onInputChange={handleChangeInputValue}
          components={components}
          {...props}
        />
      </div>
      {error && <div className={twMerge("-mb-1.5 mt-1.5 text-sm text-red-500", classNameError)}>{error}</div>}
    </div>
  );
};
export default memo(UncontrolledSelect);
