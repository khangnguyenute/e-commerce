/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";
import UncontrolledStar from "./UncontrolledStar";

const Star = ({ control, name, ...props }) => {
  if (!control?.register) {
    return <UncontrolledStar {...props} />;
  }

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (newStar) => {
      onChange(newStar);
    },
    [onChange],
  );

  return <UncontrolledStar value={value} onChange={handleChange} {...props} />;
};

export default memo(Star);
