import { Input } from "@common/Components";
import { Modal } from "@common/Components/Modal";
import { categoryFormSchema } from "@common/Components/Schemas/categoryFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useToast from "@hooks/useToast";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const DEFAULT_VALUE = {
  name: "",
};

const AdminCategoryModificationModal = ({
  isOpen,
  category,
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
    resolver: yupResolver(categoryFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateCategory = useCallback(
    async (formData) => {
      try {
        await onCreate(formData);
        toast.success(t("addCategorySuccessfully"));
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

  const handleUpdateCategoryById = useCallback(
    async (formData) => {
      if (!category) return;
      try {
        await onEdit(category._id, formData);
        toast.success(t("editCategorySuccessfully"));
        onEdited();
        onClose();
      } catch (error) {
        toast.error(t("unknown"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [category, onEdit, toast, t, onEdited, onClose],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!category) {
      handleCreateCategory(formData);
      return;
    }

    handleUpdateCategoryById(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (category) {
      reset(category);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, category]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={category ? t("editCategory") : t("addCategory")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block" control={control} disabled={isSubmitting} label={t("name")} name="name" />
    </Modal>
  );
};

export default memo(AdminCategoryModificationModal);
