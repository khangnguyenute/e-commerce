import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { values } from "lodash";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";
import { brandFormSchema } from "@common/Components/Schemas/brandFormSchema";
import { categoryService } from "@services/index";
import { Modal } from "@common/Components/Modal";
import { Input, Select } from "@common/Components";

const DEFAULT_VALUE = {
  name: "",
  category: "",
};

const AdminBrandModificationModal = ({
  isOpen,
  brand,
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
  const [categoryOptions, setCategoryOptions] = useState([]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(brandFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateBrand = useCallback(
    async (formData) => {
      try {
        await onCreate(formData);
        toast.success(t("addBrandSuccessfully"));
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

  const handleUpdateBrandById = useCallback(
    async (formData) => {
      if (!brand) return;
      try {
        await onEdit(brand._id, formData);
        toast.success(t("editBrandSuccessfully"));
        onEdited();
        onClose();
      } catch (error) {
        toast.error(t("unknown"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [brand, onEdit, toast, t, onEdited, onClose],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!brand) {
      handleCreateBrand(formData);
      return;
    }

    handleUpdateBrandById(formData);
  });

  const fetchCategoryData = useCallback(async () => {
    try {
      const { data } = await categoryService.getCategories();

      setCategoryOptions(
        values(data).map((category) => ({
          value: category.name,
          label: category.name,
        })),
      );
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [t, toast]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (brand) {
      reset(brand);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, brand]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={brand ? t("editBrand") : t("addBrand")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block" control={control} disabled={isSubmitting} label={t("name")} name="name" />
      <Select
        className="text-normal"
        control={control}
        isDisabled={isSubmitting}
        name="category"
        options={categoryOptions}
        placeholder={t("category")}
      />
    </Modal>
  );
};

export default memo(AdminBrandModificationModal);
