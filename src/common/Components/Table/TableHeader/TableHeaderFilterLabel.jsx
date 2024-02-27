import dayjs from "dayjs";
import { first } from "lodash";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const TableHeaderFilterLabel = ({ label, options, selected, filterType }) => {
  const { t } = useTranslation();

  const firstSelectedOptionLabel = useMemo(() => {
    const firstSelectedValue = first(selected);

    if (firstSelectedValue === null || firstSelectedValue === undefined) {
      return null;
    }

    if (filterType === "rangeDate") {
      const secondSelectedValue = selected[1];

      if (!secondSelectedValue) {
        return null;
      }

      return `${dayjs(firstSelectedValue).format(t("dateFormat"))} - ${dayjs(secondSelectedValue).format(
        t("dateFormat"),
      )}`;
    }

    const firstSelectedOption = options.find((option) => option.value === firstSelectedValue);

    if (!firstSelectedOption) {
      return null;
    }

    return firstSelectedOption.label;
  }, [filterType, options, selected, t]);

  return (
    <div className="flex">
      <span className="line-clamp-1">
        <span className={twMerge(firstSelectedOptionLabel && "mr-1 font-semibold")}>
          {label}
          {!!selected.length && ":"}
        </span>
      </span>

      {firstSelectedOptionLabel && (
        <span className="flex flex-wrap items-center gap-2">
          {firstSelectedOptionLabel}
          {selected.length > 1 && filterType !== "rangeDate" && (
            <span className="ml-2 inline-flex items-center justify-center rounded-xl bg-gray-300 px-2 pt-0.5 text-sm font-semibold">
              +{selected.length - 1}
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default memo(TableHeaderFilterLabel);
