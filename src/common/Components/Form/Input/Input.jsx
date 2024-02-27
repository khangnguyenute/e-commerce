/* eslint-disable react-hooks/rules-of-hooks */
import { omit } from "lodash";
import { forwardRef, memo } from "react";
import { useController } from "react-hook-form";

import UncontrolledInput from "./UncontrolledInput";

const Input = ({ name, control, ...props }, ref) => {
  if (!control?.register) {
    return <UncontrolledInput name={name} ref={ref} {...props} />;
  }

  const {
    field: { value = "", onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledInput
      value={value ?? null}
      error={errors[name]?.message}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(forwardRef(Input));
