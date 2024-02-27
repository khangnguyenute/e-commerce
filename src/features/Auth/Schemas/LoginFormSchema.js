import { object, string } from "yup";

const loginFormSchema = (t) =>
  object().shape({
    email: string()
      .email(t("emailInvalid") ?? "")
      .required(t("emailRequired") ?? ""),
    password: string().required(t("passwordRequired") ?? ""),
  });

export { loginFormSchema };
