import { string } from "yup";
import { generateFormSchema } from "@utils/Helpers";

const categoryFormSchema = (t) =>
  generateFormSchema({
    name: string().required(t("nameRequired")).nullable(),
  });

export { categoryFormSchema };
