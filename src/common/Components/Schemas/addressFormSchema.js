import { string } from "yup";
import { generateFormSchema } from "@utils/Helpers";

const addressFormSchema = (t, isRequiredMnemonicName = true) =>
  generateFormSchema({
    fullname: string().required(t("fullnameRequired")),
    mnemonicName: string().when({
      is: () => isRequiredMnemonicName,
      then: () => string().required(t("mnemonicNameRequired")),
    }),
    phone: string()
      .required(t("phoneRequired"))
      .matches(/^[0-9]{10}$/, t("phoneInvalid")),
    address: string().required(t("addressRequired")),
  });

export { addressFormSchema };
