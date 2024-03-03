import { Button, Input, passwordFormSchema } from "@common/Components";
import { yupResolver } from "@hookform/resolvers/yup";
import useDocumentTitle from "@hooks/useDocumentTitle";
import useToast from "@hooks/useToast";
import { userService } from "@services/index";
import { pick } from "lodash";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const DEFAULT_VALUE = {
  password: "",
  newPassword: "",
  passwordConfirmation: "",
};

const ProfileAccountSecurityModificationPassword = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const user = useSelector((state) => state.common.user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(passwordFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      await userService.updateUserById(user._id, pick(formData, ["password", "newPassword"]));

      toast.success(t("changePasswordSuccessfully"));
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    setIsSubmitting(false);
    reset(DEFAULT_VALUE);
  }, [reset]);

  useDocumentTitle(t("changePassword"));

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("password")}
        name="password"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("newPassword")}
        name="newPassword"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("passwordConfirmation")}
        name="passwordConfirmation"
        isRequired
      />
      <Button disabled={isSubmitting} isLoading={isSubmitting} onClick={handleSubmit}>
        {t("confirm")}
      </Button>
    </form>
  );
};

export default memo(ProfileAccountSecurityModificationPassword);
