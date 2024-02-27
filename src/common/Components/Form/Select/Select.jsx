/* eslint-disable react-hooks/rules-of-hooks */
import { get, omit } from "lodash";
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";

import UncontrolledSelect from "./UncontrolledSelect";

const Select = ({ control, name, ...props }) => {
  if (!control?.register) {
    return <UncontrolledSelect name={name} {...props} />;
  }

  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (newValue, actionMeta) => {
      onChange(get(newValue, "value"), actionMeta);
    },
    [onChange],
  );

  return (
    <UncontrolledSelect
      name={name}
      error={errors[name]?.message}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur", "ariaLiveMessage"])}
    />
  );
};
export default memo(Select);
