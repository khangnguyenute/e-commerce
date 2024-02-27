import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select } from "../../../../Components/Form";
import { Modal } from "../../../../Components/Modal";
import { values } from "lodash";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";

const status = ["processing", "packed", "inTransit", "delivered", "canceled"];

const OrderModificationModal = ({ isOpen, order, onClose, onEdit, onEdited, ...props }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]);

  const { control, reset, handleSubmit: useFormSubmit } = useForm();

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      await onEdit({ ...order, status: formData.status });
      toast.success(t("editStatusSuccessfully"));
      onEdited();
      onClose();
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    reset(order);
  }, [isOpen, reset, order]);

  useEffect(() => {
    setStatusOptions(
      values(status).map((group) => ({
        value: group,
        label: group,
      })),
    );
  }, []);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={t("editStatus")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block" control={control} disabled label={t(t("id"))} name="_id" />
      <Select
        className="text-normal"
        control={control}
        isDisabled={isSubmitting}
        name="status"
        options={statusOptions}
        placeholder={t("status")}
      />
    </Modal>
  );
};

export default memo(OrderModificationModal);
