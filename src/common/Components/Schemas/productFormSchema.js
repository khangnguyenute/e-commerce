import { string, number } from "yup";
import { generateFormSchema } from "@utils/Helpers";

const productFormSchema = (t) =>
  generateFormSchema({
    title: string().required(t("nameRequired")).nullable(),
    price: number()
      .typeError(t("priceInvalid"))
      .integer(t("priceInvalid"))
      .positive(t("priceInvalid"))
      .required(t("priceRequired"))
      .nullable(),
    category: string().required(t("categoryRequired")).nullable(),
    brand: string().required(t("brandRequired")).nullable(),
  });

export { productFormSchema };
