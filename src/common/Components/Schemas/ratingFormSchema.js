import { generateFormSchema } from "@utils/Helpers";
import { string } from "yup";

const ratingFormSchema = (t) =>
  generateFormSchema({
    content: string().required(t("contentRequired")),
  });

export { ratingFormSchema };
