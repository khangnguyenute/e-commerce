import { generateFormSchema } from "@components/Button/Utils";
import { string } from "yup";

const adminUserModificationFormSchema = (t, isRequirePassword = false) =>
  generateFormSchema({
    email: string().required(t("emailRequired")).email(t("emailInvalid")).nullable(),
    phone: string()
      .required(t("phoneRequired"))
      .matches(/^[0-9]{10}$/, t("phoneInvalid"))
      .nullable(),
    fullName: string().required(t("fullnameRequired")).nullable(),
    password: string()
      .when("id", {
        is: (id) => !id || isRequirePassword,
        then: string().required(t("passwordRequired")),
      })
      .nullable(),
  });

export { adminUserModificationFormSchema };
