import { Modal, UploadInput } from "@common/Components";
import useToast from "@hooks/useToast";
import { userService } from "@services/index";
import { updateUser } from "@slices/commonSlice";
import { pick } from "lodash";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ProfileAccountModificationModal = ({ currentUser, isOpen, onClose, ...props }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, reset, handleSubmit: useFormSubmit } = useForm();

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      await userService.updateUserById(currentUser._id, pick(formData, "image"));
      toast.success(t("editAvatarSuccessfully"));

      dispatch(updateUser(pick(formData, "image")));
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

    reset(currentUser);
  }, [isOpen, reset, currentUser]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      title={t("editAvatar")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <UploadInput
        control={control}
        disabled={isSubmitting}
        multiple={false}
        classNameImage="h-14"
        classNameEmpty="h-14"
        label={t("avatar")}
        placeholder={t("chooseAvatar")}
        name="image"
      />
    </Modal>
  );
};

export default memo(ProfileAccountModificationModal);
