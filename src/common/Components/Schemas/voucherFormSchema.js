import { generateFormSchema } from "@utils/Helpers";
import { number, string } from "yup";

const voucherFormSchema = (t) =>
  generateFormSchema({
    title: string().required(t("titleRequired")),
    name: string().required(t("nameRequired")),
    sale: number()
      .typeError(t("saleInvalid"))
      .integer(t("saleInvalid"))
      .positive(t("saleInvalid"))
      .required(t("saleRequired")),
    quantity: number()
      .typeError(t("quantityInvalid"))
      .integer(t("quantityInvalid"))
      .positive(t("quantityInvalid"))
      .required(t("quantityRequired")),
    expiredDate: string().required(t("expiredDateRequired")),
  });

export { voucherFormSchema };
