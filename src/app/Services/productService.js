import { PRODUCT_PATH } from "../Constants";
import { axiosInstance } from "@utils/Axios";

const getProducts = async (params) => {
  const response = await axiosInstance.get(PRODUCT_PATH.PRODUCTS, { params });

  return {
    data: response.data.data,
    meta: {
      total: response.data.total,
    },
  };
};

const getProductById = async (id, params) => {
  const response = await axiosInstance.get(PRODUCT_PATH.PRODUCT_ID_PATH(id), { params });

  return response.data;
};

const createProduct = async (data) => {
  const response = await axiosInstance.post(PRODUCT_PATH.PRODUCT, data);

  return response;
};

const updateProductById = async (id, data) => {
  const response = await axiosInstance.put(PRODUCT_PATH.PRODUCT_ID_PATH(id), data);

  return response;
};

const updateRatingProductById = async (id, star, totalVote) => {
  let res = await axiosInstance.put(`/product/edit/${id}`, {
    star,
    totalVote,
  });
  return res;
};

const deleteProductById = async (id) => {
  let response = await axiosInstance.delete(PRODUCT_PATH.PRODUCT_ID_PATH(id));

  return response;
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  updateRatingProductById,
  deleteProductById,
};
