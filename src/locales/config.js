import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { languageService } from "../app/Services";
import commonEn from "./en/common.json";
import commonVi from "./vi/common.json";

const currentLanguage = languageService.getPageLanguage();

export const resources = {
  en: {
    common: commonEn,
  },
  vi: {
    common: commonVi,
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: currentLanguage,
    ns: ["common"],
    interpolation: {
      escapeValue: false,
    },
    resources,
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
