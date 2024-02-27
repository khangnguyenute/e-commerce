/* eslint-disable react-hooks/rules-of-hooks */
import { omit } from "lodash";
import { forwardRef, memo, useCallback, useMemo } from "react";
import { useController } from "react-hook-form";

import UncontrolledInputDatePicker from "./UncontrolledInputDatePicker";

const InputDatePicker = ({ name, type, control, ...props }, ref) => {
  if (!control || !control.register) {
    return <UncontrolledInputDatePicker name={name} type={type} ref={ref} {...props} />;
  }

  const defaultValue = useMemo(() => (type === "rangeDate" ? [] : ""), [type]);

  const {
    field: { value = defaultValue, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleOnChange = useCallback(
    (rangeDate) => {
      onChange(rangeDate);
    },
    [onChange],
  );

  return (
    <UncontrolledInputDatePicker
      name={name}
      value={value ?? defaultValue}
      type={type}
      error={errors[name]?.message}
      onChange={handleOnChange}
      {...omit(props, ["value", "onChange", "type"])}
    />
  );
};

export default memo(forwardRef(InputDatePicker));
