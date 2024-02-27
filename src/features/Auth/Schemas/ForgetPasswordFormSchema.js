import { object, string } from "yup";

const forgetPasswordFormSchema = (t) =>
  object().shape({
    email: string()
      .email(t("emailInvalid") ?? "")
      .required(t("emailRequired") ?? ""),
  });

export { forgetPasswordFormSchema };
