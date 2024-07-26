import { memo } from "react";
import PinInput from "react-pin-input";

const UncontrolledInputOTP = ({ quantity = 6, value, error, inlineError = false, onChange, onComplete }) => {
  const handleOnChangeOTP = (inputOTP) => {
    onChange?.(inputOTP);
  };

  return (
    <div className="block cursor-text bg-white ring-inset transition-colors duration-200">
      <PinInput
        length={quantity}
        initialValue={String(value)}
        onChange={handleOnChangeOTP}
        onComplete={onComplete}
        type="numeric"
        inputMode="number"
        style={{ display: "flex", justifyContent: "space-between" }}
        inputStyle={{
          borderRadius: "8px",
          borderWidth: "2px",
          borderColor: error ? "#EF4444" : "#f3f4f6",
          marginInline: "0px",
        }}
        inputFocusStyle={{ borderColor: "#3b82f6" }}
        autoSelect
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      {!inlineError && Boolean(error) && <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default memo(UncontrolledInputOTP);
