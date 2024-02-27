import { Input } from "@common/Components";
import { InformationModal } from "@common/Components/Modal";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AdminRatingModificationModal = ({ isOpen, rating, onClose }) => {
  const { t } = useTranslation();

  const { control, reset } = useForm({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset(rating);
  }, [isOpen, reset, rating]);

  return (
    <InformationModal isOpen={isOpen} title={t("viewRating")} onClose={onClose}>
      <Input className="block" control={control} disabled label={t("product")} name="product.name" />
      <Input className="block" control={control} disabled label={t("user")} name="user.email" />
      <Input className="block" control={control} disabled label={t("star")} name="star" />
      <Input className="block" control={control} disabled label={t("content")} name="content" />
    </InformationModal>
  );
};

export default memo(AdminRatingModificationModal);
