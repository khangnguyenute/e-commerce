import { string } from "yup";
import { generateFormSchema } from "../Utils";

const categoryFormSchema = (t) =>
  generateFormSchema({
    name: string().required(t("nameRequired")).nullable(),
  });

export { categoryFormSchema };
