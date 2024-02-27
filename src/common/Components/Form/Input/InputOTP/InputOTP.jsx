/* eslint-disable react-hooks/rules-of-hooks */
import { omit } from "lodash";
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";

import UncontrolledInputOTP from "./UncontrolledInputOTP";

const InputOTP = ({ name, quantity, control, ...props }) => {
  if (!control?.register) {
    return <UncontrolledInputOTP name={name} quantity={quantity} {...props} />;
  }

  const {
    field: { value = "", onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleOnChange = useCallback(
    (inputOTP) => {
      onChange(inputOTP);
    },
    [onChange],
  );

  return (
    <UncontrolledInputOTP
      quantity={quantity}
      value={value ?? null}
      error={errors[name]?.message}
      onChange={handleOnChange}
      {...omit(props, ["value", "onChange"])}
    />
  );
};

export default memo(InputOTP);
