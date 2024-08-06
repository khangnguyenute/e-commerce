import { array } from "yup";
import { generateFormSchema } from "@utils/Helpers";

const paymentFormSchema = (t) =>
  generateFormSchema({
    paymentMethod: array().min(1, t("paymentMethodRequired")).required(t("paymentMethodRequired")),
  });

export { paymentFormSchema };
