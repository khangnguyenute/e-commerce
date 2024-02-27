import { isEmpty, isEqual } from "lodash";
import { useCallback, useEffect, useState } from "react";

/**
 * Use to save and update query param. Work with `Table` component only.
 */
const useQueryParam = (defaultQueryParam) => {
  const [queryParam, setQueryParam] = useState(null);

  const handleChange = useCallback((data) => {
    setQueryParam((prev) => {
      const newData = {
        ...prev,
        ...(typeof data === "function" ? data(prev) : data),
      };

      if (isEqual(prev, newData)) {
        return prev;
      }

      return newData;
    });
  }, []);

  const increasePageIndex = useCallback(() => {
    handleChange((prev) => ({
      ...prev,
      pageIndex: (prev.pageIndex ?? 0) + 1,
    }));
  }, [handleChange]);

  useEffect(() => {
    if (isEmpty(defaultQueryParam)) {
      return;
    }

    setQueryParam(defaultQueryParam);
  }, [defaultQueryParam]);

  return [queryParam, handleChange, increasePageIndex];
};

export default useQueryParam;
