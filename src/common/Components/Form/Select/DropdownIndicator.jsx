import { memo } from "react";
import { components } from "react-select";
import { LoadingSpinner } from "../../Loading";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator className="px-2" {...props}>
      <LoadingSpinner className="h-3.5 w-3.5 border border-slate-700" />
    </components.DropdownIndicator>
  );
};

export default memo(DropdownIndicator);
