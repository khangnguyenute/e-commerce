import { string } from "yup";
import { generateFormSchema } from "../Utils";

const discussFormSchema = (t) =>
  generateFormSchema({
    content: string().required(t("contentRequired")),
  });

export { discussFormSchema };
