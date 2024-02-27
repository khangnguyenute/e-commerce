import { string } from "yup";
import { generateFormSchema } from "../Utils";

const brandFormSchema = (t) =>
  generateFormSchema({
    name: string().required(t("nameRequired")),
    category: string().required(t("categoryRequired")),
  });

export { brandFormSchema };
