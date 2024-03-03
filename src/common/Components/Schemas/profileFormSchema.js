import { string } from "yup";
import { generateFormSchema } from "../Utils";

const profileFormSchema = (t) =>
  generateFormSchema({
    fullname: string().required(t("fullnameRequired")),
  });

const passwordFormSchema = (t) =>
  generateFormSchema({
    password: string().required(t("passwordRequired")),
    newPassword: string().required(t("newPasswordRequired")),
    passwordConfirmation: string().required(t("passwordConfirmationRequired")),
  });

const emailFormSchema = (t) =>
  generateFormSchema({
    email: string().required(t("emailRequired")),
  });

const phoneFormSchema = (t) =>
  generateFormSchema({
    phone: string().required(t("phoneRequired")),
  });

export { profileFormSchema, passwordFormSchema, emailFormSchema, phoneFormSchema };
