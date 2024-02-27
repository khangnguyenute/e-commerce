import { axiosInstance } from "@utils/Axios";
import { CATEGORY_PATH } from "../Constants";

const getCategories = async (params) => {
  const response = await axiosInstance.get(CATEGORY_PATH.CATEGORIES, {
    params,
  });

  return {
    data: response.data.data,
    meta: {
      total: response.data.total,
    },
  };
};

const createCategory = async (data) => {
  const response = await axiosInstance.post(CATEGORY_PATH.CATEGORY, data);

  return response;
};

const updateCategoryById = async (id, data) => {
  const response = await axiosInstance.put(CATEGORY_PATH.CATEGORY_ID_PATH(id), data);

  return response;
};

const deleteCategoryById = async (id) => {
  let response = await axiosInstance.delete(CATEGORY_PATH.CATEGORY_ID_PATH(id));

  return response;
};

export { getCategories, createCategory, updateCategoryById, deleteCategoryById };
