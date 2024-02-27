import { memo, useCallback, useState } from "react";

import SelectorOption from "./SelectorOption";

const UncontrolledSelector = ({ name, options, isSingleSelection, error, inlineError = false, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChangeOptions = useCallback(
    (value) => {
      setSelectedOptions(value);
      onChange(value);
    },
    [onChange],
  );

  return (
    <>
      <SelectorOption
        name={name}
        options={options}
        isSingleSelection={isSingleSelection}
        selectedOptions={selectedOptions}
        onChangeOptions={handleChangeOptions}
      />
      {!inlineError && Boolean(error) && <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>}
    </>
  );
};

export default memo(UncontrolledSelector);
