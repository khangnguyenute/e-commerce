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
      className={twMerge(
        "flex flex-col space-y-4 rounded-lg border-2 p-6",
        index === "0" && "border-blue-500",
      )}
    >
      <div className="flex flex-wrap-reverse items-center justify-between gap-4">
        <span className="font-bold uppercase text-blue-500">{addressItem.fullname}</span>
        {index === "0" && (
          <span className="rounded-xl border border-green-500 p-2 text-xs text-green-500">
            {t("defaultAddress")}
          </span>
        )}
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
      <div>
        {t("phone")}:<span className="ml-2 font-semibold">{addressItem.phone}</span>
      </div>
      <div className="line-clamp-2">
        {t("address")}:
        <span className="font-semibold">
          <span className="ml-2">{addressItem.address},</span>
          <span className="ml-2">{addressItem.ward?.name},</span>
          <span className="ml-2">{addressItem.district?.name},</span>
          <span className="ml-2">{addressItem.city?.name}</span>
        </span>
      </div>
    </div>
  );
};

export default memo(ProfileAddressItem);
