import { useTranslation } from "react-i18next";
import { BiListPlus } from "react-icons/bi";
import { memo } from "react";
import { Button } from "@common/Components";

const AdminBrandHeaderAction = ({ onClickAdd }) => {
  const { t } = useTranslation();

  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiListPlus size={24} className="mr-2" />
      {t("addBrand")}
    </Button>
  );
};

export default memo(AdminBrandHeaderAction);
