/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";
import UncontrolledSelector from "./UncontrolledSelector";

const Selector = ({ control, name, ...props }) => {
  if (!control?.register) {
    return <UncontrolledSelector name={name} {...props} />;
  }

  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (newValue) => {
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <UncontrolledSelector
      name={name}
      checked={value}
      error={errors[name]?.message}
      onChange={handleChange}
      {...props}
    />
  );
};

export default memo(Selector);
