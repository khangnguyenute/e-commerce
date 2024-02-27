import { array } from "yup";
import { generateFormSchema } from "../Utils";

const paymentFormSchema = (t) =>
  generateFormSchema({
    paymentMethod: array().min(1, t("paymentMethodRequired")).required(t("paymentMethodRequired")),
  });

export { paymentFormSchema };
