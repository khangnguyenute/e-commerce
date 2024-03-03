import { axiosInstance } from "@utils/Axios";
import { ADMIN_USER_PATH } from "../Constants";

const getUsers = async (params) => {
  const response = await axiosInstance.get(ADMIN_USER_PATH.USERS, { params });
  return {
    data: response.data.data,
    meta: {
      total: response.data.total,
    },
  };
};

const createUser = async (data) => {
  const response = await axiosInstance.post(ADMIN_USER_PATH.USERS, data);

  return response.data.data;
};

const updateUserById = async (id, data) => {
  const response = await axiosInstance.put(ADMIN_USER_PATH.USER_ID_PATH(id), data);

  return response.data.data;
};

const updateUserStatusById = async (id, status) => {
  const response = await axiosInstance.put(ADMIN_USER_PATH.USER_ID_PATH(id), {
    status,
  });

  return response.data.data;
};

const deleteUserById = (id) => axiosInstance.delete(ADMIN_USER_PATH.USER_ID_PATH(id));

const addFavoriteProduct = async (data) => {
  const response = await axiosInstance.post(ADMIN_USER_PATH.USER_FAVORITE_PRODUCT, data);

  return response.data.data;
};

const addAddress = async (id, data) => {
  const response = await axiosInstance.put(`/user/addAddress/${id}`, data);

  return response.data.data;
};
const deleteAddress = async (id, data) => {
  const response = await axiosInstance.put(`/user/deleteAddress/${id}`, data);

  return response.data.data;
};
const editAddress = async (id, data) => {
  const response = await axiosInstance.put(`/user/editAddress/${id}`, data);

  return response.data.data;
};

export {
  createUser,
  deleteUserById,
  getUsers,
  updateUserById,
  updateUserStatusById,
  addFavoriteProduct,
  addAddress,
  deleteAddress,
  editAddress,
};
