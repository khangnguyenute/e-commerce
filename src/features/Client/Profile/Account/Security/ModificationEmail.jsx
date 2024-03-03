import { Button, Input, emailFormSchema } from "@common/Components";
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
  email: "",
};

const ProfileAccountSecurityModificationEmail = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const user = useSelector((state) => state.common.user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(emailFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      await userService.updateUserById(user._id, pick(formData, "email"));

      toast.success(t("editEmailSuccessfully"));
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

  useDocumentTitle(t("editEmail"));

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("email")}
        name="email"
        isRequired
      />
      <Button disabled={isSubmitting} isLoading={isSubmitting} onClick={handleSubmit}>
        {t("confirm")}
      </Button>
    </form>
  );
};

export default memo(ProfileAccountSecurityModificationEmail);
