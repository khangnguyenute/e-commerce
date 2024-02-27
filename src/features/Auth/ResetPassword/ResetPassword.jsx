import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { memo, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPasswordFormSchema } from "../Schemas/ResetPassowordFormSchema";
import { authService } from "@services/index";
import { AUTH_CODE } from "@constants/codeConstant";
import { AUTH_PATH } from "@constants/routeConstant";
import AuthFormContainer from "../Components/AuthFormContainer";
import ResetPasswordFormFooter from "./Components/ResetPasswordFormFooter";
import { Alert, Button, Input, InputOTP } from "@common/Components";
import useToast from "@hooks/useToast";
import useDocumentTitle from "@hooks/useDocumentTitle";

const ResetPassword = () => {
  const { t } = useTranslation();

  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState(null);
  const navigate = useNavigate();

  const { control, handleSubmit: useFormSubmit } = useForm({
    resolver: yupResolver(resetPasswordFormSchema(t)),
  });

  const { search } = useLocation();
  const lastPath = useMemo(() => search.split("?email=").pop(), [search]);

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      await authService.resetPassword(String(lastPath), formData);
      setGeneralError(null);
      navigate(`${AUTH_PATH.LOGIN}?code=${AUTH_CODE.RESET_PASSWORD}`);
      toast.success(t("resetPasswordSuccessfully"));
    } catch (error) {
      if (error instanceof AxiosError) {
        setGeneralError({
          code: AUTH_CODE.OTP_INCORRECT,
          message: t("otpIncorrect"),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  useDocumentTitle(t("resetPassword"));

  return (
    <AuthFormContainer
      title={t("resetYourPassword")}
      subtitle={t("resetPasswordSubtitle")}
      footer={<ResetPasswordFormFooter />}
    >
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        {generalError ? (
          <Alert
            title={t("resetPasswordError")}
            message={generalError.message}
            type="danger"
            className="mb-2"
          >
            <Link to={AUTH_PATH.FORGET_PASSWORD}>{t("requestNewLink")}</Link>
          </Alert>
        ) : (
          <Alert
            title={t("resetPasswordLinkSent")}
            message={t("resetPasswordMessage", { email: lastPath })}
            type="success"
            className="mb-2"
          />
        )}

        <InputOTP
          name="otp"
          className="block w-full"
          disabled={isSubmitting}
          control={control}
          quantity={6}
        />

        <Input
          type="password"
          label={t("password")}
          name="password"
          className="block"
          disabled={isSubmitting}
          control={control}
        />
        <Input
          type="password"
          label={t("passwordConfirmation")}
          name="passwordConfirmation"
          className="block"
          disabled={isSubmitting}
          control={control}
        />

        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          {t("resetPassword")}
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default memo(ResetPassword);
