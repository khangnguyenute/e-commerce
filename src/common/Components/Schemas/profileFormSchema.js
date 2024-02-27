import { string } from "yup";
import { generateFormSchema } from "../Utils";

const profileFormSchema = (t) =>
  generateFormSchema({
    fullname: string().required(t("fullnameRequired")),
  });

export { profileFormSchema };
