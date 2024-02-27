import { BRAND_PATH } from "../Constants";
import { axiosInstance } from "@utils/Axios";

const getBrands = async (params) => {
  const response = await axiosInstance.get(BRAND_PATH.BRANDS, { params });

  return {
    data: response.data.data,
    meta: {
      total: response.data.total,
    },
  };
};

const createBrand = async (data) => {
  const response = await axiosInstance.post(BRAND_PATH.BRAND, data);

  return response;
};

const updateBrandById = async (id, data) => {
  const response = await axiosInstance.put(BRAND_PATH.BRAND_ID_PATH(id), data);

  return response;
};

const deleteBrandById = async (id) => {
  let response = await axiosInstance.delete(BRAND_PATH.BRAND_ID_PATH(id));

  return response;
};

export { getBrands, createBrand, updateBrandById, deleteBrandById };
