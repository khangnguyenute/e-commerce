import { yupResolver } from "@hookform/resolvers/yup";
import { NOT_FOUND, UNAUTHORIZED } from "http-status";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginFormSchema } from "../Schemas/LoginFormSchema";
import { authService } from "@services/index";
import { setUser } from "@slices/commonSlice";
import { generateAuthRedirectURL } from "../Utils/GenerateAuthRedirectURL";
import { AUTH_CODE } from "@constants/codeConstant";
import AuthFormContainer from "../Components/AuthFormContainer";
import LoginFormFooter from "./Components/LoginFormFooter";
import { Alert, Button, Input } from "@common/Components";
import { AUTH_PATH } from "@constants/routeConstant";
import { setAccessToken, setLocalUser } from "@services/authService";
import useDocumentTitle from "@hooks/useDocumentTitle";

const Login = () => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState(null);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    watch,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(loginFormSchema(t)),
  });

  const phoneOrEmail = watch("email");

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      const response = await authService.login(formData);

      dispatch(setUser(response));
      setLocalUser(response);
      setAccessToken(response.accessToken);

      const redirectURL = generateAuthRedirectURL(response.role, searchParams.get("redirect"));
      navigate(redirectURL, {
        replace: true,
      });
    } catch (err) {
      const { status, message } = err.response?.data;
      if (status === UNAUTHORIZED) {
        setGeneralError({
          code: AUTH_CODE.ACCOUNT_INCORRECT,
          message,
        });
        return;
      }
      if (status === NOT_FOUND) {
        setGeneralError({
          code: AUTH_CODE.ACCOUNT_NOT_EXISTS,
          message,
        });
        return;
      }
      setGeneralError({ ...err });
    } finally {
      setIsSubmitting(false);
    }
  });

  useDocumentTitle(t("login"));

  return (
    <AuthFormContainer title={t("loginTitle")} subtitle={t("loginSubtitle")} footer={<LoginFormFooter />}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {generalError && (
          <Alert title={t("loginError")} message={generalError.message} type="danger" className="mb-2">
            {generalError.code === AUTH_CODE.ACCOUNT_NOT_EXISTS && (
              <Link
                to={`${AUTH_PATH.REGISTER}?email=${encodeURIComponent(
                  phoneOrEmail || "",
                )}&redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`}
              >
                {t("createWithEmail")}
              </Link>
            )}
          </Alert>
        )}
        <Input name="email" label={t("email")} className="block" control={control} disabled={isSubmitting} />
        <Input
          type="password"
          label={t("password")}
          name="password"
          className="block"
          control={control}
          disabled={isSubmitting}
        />
        <div className="-mb-1.5 -mt-2 flex justify-end">
          <Link
            to={AUTH_PATH.FORGET_PASSWORD}
            className="text-center text-sm font-semibold text-gray-400 hover:underline"
            role="link"
            tabIndex={-1}
          >
            {t("forgotYourPassword")}
          </Link>
        </div>
        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          {t("login")}
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default memo(Login);
