import { object, ref, string } from "yup";

const registerFormSchema = (t) =>
  object().shape({
    firstName: string().required(t("firstNameRequired") ?? ""),
    lastName: string().required(t("lastNameRequired") ?? ""),
    phone: string().required(t("phoneRequired")).nullable(),
    email: string()
      .email(t("emailInvalid") ?? "")
      .required(t("emailRequired") ?? "")
      .nullable(),
    password: string().required(t("passwordRequired") ?? ""),
    passwordConfirmation: string()
      .oneOf([ref("password")], t("passwordConfirmationNotMatch") ?? "")
      .required(t("passwordConfirmationRequired") ?? ""),
  });

export { registerFormSchema };
