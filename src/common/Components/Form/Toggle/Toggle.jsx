/* eslint-disable react-hooks/rules-of-hooks */
import { memo } from "react";
import { useController } from "react-hook-form";

import UncontrolledToggle from "./UncontrolledToggle";

const Toggle = ({ control, name = "", isSelfControlled, ...props }) => {
  if (!control?.register) {
    return <UncontrolledToggle isSelfControlled={isSelfControlled} {...props} />;
  }

  const {
    field: { value = false, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledToggle
      isOn={value}
      isSelfControlled={isSelfControlled}
      error={errors[name]?.message}
      onChange={onChange}
      {...props}
    />
  );
};
export default memo(Toggle);
