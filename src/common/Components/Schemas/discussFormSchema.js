import { string } from "yup";
import { generateFormSchema } from "@utils/Helpers";

const discussFormSchema = (t) =>
  generateFormSchema({
    content: string().required(t("contentRequired")),
  });

export { discussFormSchema };
