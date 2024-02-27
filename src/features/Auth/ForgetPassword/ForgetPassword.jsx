import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { forgetPasswordFormSchema } from "../Schemas/ForgetPasswordFormSchema";
import { authService } from "@services/index";
import { AUTH_PATH } from "@constants/routeConstant";
import { AUTH_CODE } from "@constants/codeConstant";
import AuthFormContainer from "../Components/AuthFormContainer";
import { useDocumentTitle } from "src/common/Hooks";
import ForgetPasswordFormFooter from "./Components/ForgetPasswordFormFooter";
import { Alert, Button, Input } from "@common/Components";

const ForgetPassword = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const { control, handleSubmit: useFormSubmit } = useForm({
    resolver: yupResolver(forgetPasswordFormSchema(t)),
  });

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      await authService.forgetPassword(formData.email);
      setGeneralError(null);
      navigate(`${AUTH_PATH.RESET_PASSWORD}?email=${formData.email}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        setGeneralError({
          code: AUTH_CODE.ACCOUNT_NOT_EXISTS,
          message: t("emailNotExists", { email: formData.email }),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  useDocumentTitle(t("forgetPassword"));

  return (
    <AuthFormContainer
      title={t("forgotYourPassword")}
      subtitle={t("forgetPasswordSubtitle")}
      footer={<ForgetPasswordFormFooter />}
    >
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        {generalError && (
          <Alert
            title={t("forgetPasswordError")}
            message={generalError.message}
            type="danger"
            className="mb-2"
          />
        )}
        <Input
          type="text"
          label={t("email")}
          name="email"
          className="block"
          disabled={isSubmitting}
          control={control}
        />
        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          {t("forgetPassword")}
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default memo(ForgetPassword);
