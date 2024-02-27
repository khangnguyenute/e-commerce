import { values } from "lodash";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { DataStatusEnum } from "@enums/commonEnum";

import Select from "./Select";

const SelectDataStatus = (props) => {
  const { t } = useTranslation();

  const statusOptions = useMemo(
    () =>
      values(DataStatusEnum).map((status) => ({
        label: t(status),
        value: status,
      })),
    [t]
  );

  return (
    <Select options={statusOptions} placeholder={t("status")} {...props} />
  );
};
export default memo(SelectDataStatus);
