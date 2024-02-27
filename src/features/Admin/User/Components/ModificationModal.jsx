import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { userFormSchema } from "@common/Components/Schemas/userFormSchema";
import { Modal } from "@common/Components/Modal";
import { Input, UploadInput } from "@common/Components";
import useToast from "@hooks/useToast";

const DEFAULT_VALUE = {
  fullname: "",
  email: "",
  phone: "",
  password: "",
  image: "",
};

const AdminUserModificationModal = ({
  isOpen,
  user,
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
    resolver: yupResolver(userFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateUser = useCallback(
    async (formData) => {
      try {
        await onCreate(formData);
        toast.success(t("addUserSuccessfully"));
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

  const handleUpdateUserById = useCallback(
    async (formData) => {
      if (!user) return;
      try {
        await onEdit(user._id, formData);
        toast.success(t("editUserSuccessfully"));
        onEdited();
        onClose();
      } catch (error) {
        toast.error(t("unknown"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, onEdit, toast, t, onEdited, onClose],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!user) {
      handleCreateUser(formData);
      return;
    }

    handleUpdateUserById(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (user) {
      reset({
        ...user,
        password: "",
      });
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, user]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={user ? t("editUser") : t("addUser")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input
        label={t("fullname")}
        name="fullname"
        className="block"
        disabled={isSubmitting}
        control={control}
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting || !!user}
        label={t("email")}
        name="email"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("phone")}
        name="phone"
        isRequired
      />
      {!user && (
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("password")}
          name="password"
          type="password"
          autoSave="off"
          isRequired
        />
      )}
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

export default memo(AdminUserModificationModal);
