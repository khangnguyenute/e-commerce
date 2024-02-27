import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const ProfileAddressItem = ({ addressItem, onClickEdit, onClickDelete, index }) => {
  const { t } = useTranslation();

  const handleClickEdit = useCallback(() => {
    onClickEdit?.(addressItem);
  }, [addressItem, onClickEdit]);

  const handleClickDelete = useCallback(() => {
    onClickDelete?.(addressItem);
  }, [addressItem, onClickDelete]);

  return (
    <div
      className={twMerge("flex justify-between rounded-lg border-2 p-6", index === "0" && "border-blue-500")}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold uppercase text-blue-500">{addressItem.fullname}</span>
          {index === "0" && (
            <span className="rounded-xl border border-green-500 p-2 text-xs text-green-500">
              {t("defaultAddress")}
            </span>
          )}
        </div>
        <div>
          {t("phone")}: <span className="font-semibold">{addressItem.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{t("address")}:</span>
          <div className="line-clamp-1 break-all font-semibold">
            <span>{addressItem.address}, </span>
            <span>{addressItem.ward?.name}, </span>
            <span>{addressItem.district?.name}, </span>
            <span>{addressItem.city?.name}</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <div
          role="button"
          tabIndex={0}
          className="cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={handleClickEdit}
        >
          {t("edit")}
        </div>
        <div
          role="button"
          tabIndex={0}
          className="cursor-pointer text-red-500 hover:text-red-700"
          onClick={handleClickDelete}
        >
          {t("delete")}
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileAddressItem);
