import { LANGUAGE_API_PATH } from "@constants/apiConstant";
import { DEFAULT_PAGE_LANGUAGE } from "@constants/commonConstant";
import { axiosInstance } from "@utils/Axios";

const setPageLanguage = async (language) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({}), 1000);
    localStorage.setItem("currentLanguage", language);
  });

const getPageLanguage = () => {
  const currentLanguage = localStorage.getItem("currentLanguage");

  if (!currentLanguage) {
    return DEFAULT_PAGE_LANGUAGE;
  }

  return currentLanguage;
};

const getLanguages = async (params) => {
  const response = await axiosInstance.get(LANGUAGE_API_PATH.LANGUAGE, { params });

  return {
    data: response.data.data.items,
    meta: {
      total: response.data.data.total,
    },
  };
};

export { getLanguages, getPageLanguage, setPageLanguage };
