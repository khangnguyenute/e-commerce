import { string } from "yup";
import { generateFormSchema } from "../Utils";

const ratingFormSchema = (t) =>
  generateFormSchema({
    content: string().required(t("contentRequired")),
  });

export { ratingFormSchema };
