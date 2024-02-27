import { uniq } from "lodash";
import { memo, useCallback } from "react";

import SelectorOptionItem from "./SelectorOptionItem";

const SelectorOption = ({ name, isSingleSelection = true, options, selectedOptions, onChangeOptions }) => {
  const handleGetNewSelectedOption = useCallback(
    (value, checked) => {
      if (isSingleSelection) {
        return [value];
      }
      const newSelectedOptions = [...selectedOptions];
      if (checked) {
        newSelectedOptions.push(value);
      } else {
        const index = newSelectedOptions.indexOf(value);
        if (index > -1) {
          newSelectedOptions.splice(index, 1);
        }
      }
      return uniq(newSelectedOptions);
    },
    [isSingleSelection, selectedOptions],
  );

  const handleChangeSelectedOption = useCallback(
    (value, checked) => {
      const newSelectedOptions = handleGetNewSelectedOption(value, checked);

      onChangeOptions?.(newSelectedOptions);
    },
    [handleGetNewSelectedOption, onChangeOptions],
  );

  return (
    <div className="flex flex-col bg-white px-4 text-slate-700">
      {options.map((option) => {
        return (
          <SelectorOptionItem
            key={option.id || option._id || option.code}
            name={name}
            isSingleSelection={isSingleSelection}
            option={option}
            selectedOptions={selectedOptions}
            onChange={handleChangeSelectedOption}
          />
        );
      })}
    </div>
  );
};

export default memo(SelectorOption);
