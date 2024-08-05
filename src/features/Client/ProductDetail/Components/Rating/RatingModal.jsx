import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";
import { ratingService } from "@services/index";
import { Modal } from "@common/Components/Modal";
import { Star, Textarea, ratingFormSchema } from "@common/Components";

const DEFAULT_VALUE = {
  content: "",
  star: 0,
};

const ProductDetailRatingModal = ({ isOpen, product, user, onClose, onGetRatings, ...props }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(ratingFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    const newRating = {
      ...formData,
      product_id: product._id,
      product: product,
      user_id: user._id,
      user: user,
    };

    try {
      await ratingService.createRating(newRating);
      toast.success(t("addRatingSuccessfully"));
      onGetRatings();
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
    reset(DEFAULT_VALUE);
  }, [isOpen, reset]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      title={t("addRating")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <div className="flex items-center justify-center text-xl font-bold">
        <div className="w-20">
          <img src={product.image} alt={product.name} />
        </div>
        <p>{product.name}</p>
      </div>
      <Star control={control} name="star" disabled={isSubmitting} starClassName="text-3xl" />
      <Textarea
        className="block"
        control={control}
        disabled={isSubmitting}
        placeholder={t("shareThoughtProduct")}
        name="content"
        rows={4}
      />
    </Modal>
  );
};

export default memo(ProductDetailRatingModal);
