import { Input, Select, Textarea, UploadInput } from "@common/Components";
import { Modal } from "@common/Components/Modal";
import { productFormSchema } from "@common/Components/Schemas/productFormSchema";
import { ramEnum } from "@constants/enumConstant";
import { yupResolver } from "@hookform/resolvers/yup";
import useToast from "@hooks/useToast";
import { brandService, categoryService } from "@services/index";
import { values } from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const DEFAULT_VALUE = {
  title: "",
  price: "",
  info: "",
  img: "",
  promotion: "",
  discount: "",
  tag: "",
  rating: "",
  category: "",
  brand: "",
};

const AdminProductModificationModal = ({
  isOpen,
  product,
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
  const [brandOptions, setBrandOptions] = useState([]);

  const {
    control,
    reset,
    watch,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(productFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const category = watch("category");

  const handleCreateProduct = useCallback(
    async (formData) => {
      try {
        await onCreate(formData);
        toast.success(t("addProductSuccessfully"));
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

  const handleUpdateProductById = useCallback(
    async (formData) => {
      if (!product) return;
      try {
        await onEdit(product._id, formData);
        toast.success(t("editProductSuccessfully"));
        onEdited();
        onClose();
      } catch (error) {
        toast.error(t("unknown"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [onClose, onEdit, onEdited, product, t, toast],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!product) {
      handleCreateProduct(formData);
      return;
    }

    handleUpdateProductById(formData);
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

  const fetchBrandData = useCallback(async () => {
    try {
      const data = await brandService.getBrands(category);

      setBrandOptions(
        values(data).map((brand) => ({
          value: brand.name,
          label: brand.name,
        })),
      );
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [category, toast, t]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (product) {
      reset(product);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, product]);

  useEffect(() => {
    fetchCategoryData();
    fetchBrandData();
  }, [fetchCategoryData, fetchBrandData]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={product ? t("editProduct") : t("addProduct")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <div className="grid grid-cols-2 gap-6">
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("name")}
          name="title"
          isRequired
        />
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("price")}
          name="price"
          isRequired
        />
      </div>
      <Textarea
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("information")}
        name="info"
        isRequired
      />
      <div className="grid grid-cols-2 gap-6">
        <Select
          className="text-normal"
          control={control}
          isDisabled={isSubmitting}
          name="category"
          options={categoryOptions}
          placeholder={t("category")}
        />
        <Select
          className="text-normal"
          control={control}
          isDisabled={isSubmitting || !category}
          name="brand"
          options={brandOptions}
          placeholder={t("brand")}
        />
      </div>
      <UploadInput
        control={control}
        disabled={isSubmitting}
        multiple={false}
        classNameImage="h-14"
        classNameEmpty="h-14"
        label={t("image")}
        placeholder={t("chooseImage")}
        name="image"
      />
      <div className={twMerge("grid gap-6", product && "grid-cols-2")}>
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("discount")}
          name="discount"
        />
        {product && <Input className="block" control={control} disabled label={t("rating")} name="star" />}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("promotion")}
          name="promotion"
          isRequired={false}
        />
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("tag")}
          name="tag"
          isRequired={false}
        />
      </div>
      <Select
        className="text-normal"
        control={control}
        isDisabled={isSubmitting}
        name="RAM"
        options={ramEnum}
        placeholder={t("ram")}
      />
      <UploadInput
        control={control}
        disabled={isSubmitting}
        multiple
        classNameImage="h-14"
        classNameEmpty="h-14"
        label={t("gallery")}
        placeholder={t("chooseImage")}
        name="gallery"
      />
    </Modal>
  );
};

export default memo(AdminProductModificationModal);
