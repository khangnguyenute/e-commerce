/* eslint-disable react-hooks/rules-of-hooks */
import { omit } from "lodash";
import { memo } from "react";
import { useController } from "react-hook-form";

import UncontrolledUploadInput from "./UncontrolledUploadInput";

const UploadInput = ({ name, control, multiple, ...props }) => {
  if (!control || !control.register) {
    return <UncontrolledUploadInput name={name} multiple={multiple} {...props} />;
  }

  const {
    field: { value = null, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledUploadInput
      value={value ?? null}
      error={errors[name]?.message}
      multiple={multiple}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(UploadInput);
