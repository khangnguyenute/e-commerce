import { Input, InputDatePicker } from "@common/Components";
import { Modal } from "@common/Components/Modal";
import { voucherFormSchema } from "@common/Components/Schemas/voucherFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useToast from "@hooks/useToast";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const DEFAULT_VALUE = {
  title: "",
  name: "",
  sale: "",
  quantity: "",
  condition: "",
  expiredDate: "",
  redeemUse: "",
};

const AdminVoucherModificationModal = ({
  isOpen,
  voucher,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(voucherFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateVoucher = useCallback(
    async (formData) => {
      try {
        await onCreate({
          ...formData,
          sale: (Number(formData.sale) / 100).toFixed(2),
        });
        toast.success(t("addVoucherSuccessfully"));
        onCreated();
        onClose();
      } catch (error) {
        toast.error(t("unknown"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [onClose, onCreate, onCreated, t, toast],
  );

  const handleUpdateVoucherById = useCallback(
    async (formData) => {
      if (!voucher) return;
      try {
        await onEdit(voucher._id, {
          ...formData,
          sale: (Number(formData.sale) / 100).toFixed(2),
        });
        toast.success(t("editVoucherSuccessfully"));
        onEdited();
        onClose();
      } catch (error) {
        toast.error(t("unknown"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [voucher, onEdit, toast, t, onEdited, onClose],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!voucher) {
      handleCreateVoucher(formData);
      return;
    }

    handleUpdateVoucherById(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (voucher) {
      reset(voucher);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, voucher]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={voucher ? t("editVoucher") : t("addVoucher")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("title")}
        name="title"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("name")}
        name="name"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("sale")}
        name="sale"
        isRequired
      />
      <div className="grid grid-cols-2 gap-6">
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("quantity")}
          name="quantity"
          isRequired
        />
        <InputDatePicker
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("expiredDate")}
          name="expiredDate"
        />
      </div>
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("condition")}
        name="condition"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("redeemUse")}
        name="redeemUse"
        isRequired
      />
    </Modal>
  );
};

export default memo(AdminVoucherModificationModal);
