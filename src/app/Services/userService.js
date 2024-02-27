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

export { createUser, deleteUserById, getUsers, updateUserById, updateUserStatusById };

export const _editUser = async (id, data) => {
  const response = await axiosInstance.put(`/user/edit/${id}`, data);

  return response.data.data;
};

export const _editPhone = async (id, data) => {
  const response = await axiosInstance.put(`/user/editPhone/${id}`, data);

  return response.data.data;
};

export const _editPass = async (id, data) => {
  const response = await axiosInstance.put(`/user/editPass/${id}`, data);

  return response.data.data;
};

// {
//     "_id":"6360c477323aa241380d7be3",  id nguoi dùng
//     "prodId": "2"
// }
export const addFavoriteProduct = async (data) => {
  const response = await axiosInstance.post(ADMIN_USER_PATH.USER_FAVORITE_PRODUCT, data);

  return response.data.data;
};

export const addAddress = async (id, data) => {
  const response = await axiosInstance.put(`/user/addAddress/${id}`, data);

  return response.data.data;
};
export const deleteAddress = async (id, data) => {
  const response = await axiosInstance.put(`/user/deleteAddress/${id}`, data);

  return response.data.data;
};
export const editAddress = async (id, data) => {
  const response = await axiosInstance.put(`/user/editAddress/${id}`, data);

  return response.data.data;
};

export const _checkMail = async (dispatch, data) => {
  const response = await axiosInstance.put("/user/checkMail", data);

  return response.data.data;
};
export const _changeMail = async (data) => {
  const response = await axiosInstance.post("/services/changeEmail", data);

  return response.data.data;
};

export const _verifyChangeMail = async (data, dispatch) => {
  const response = await axiosInstance.post("/services/verifyChangeEmail", data);

  return response.data.data;
};

export const _forgetPass = async (data) => {
  const response = await axiosInstance.post("/services/forgetPassword", data);

  return response.data.data;
};

export const _editForgetPassword = async (data) => {
  const response = await axiosInstance.post("/services/editForgetPassword", data);

  return response.data.data;
};
export const _loginSucessPhone = async (data, dispatch) => {
  const response = await axiosInstance.post("/auth/loginSucessPhone", data);

  return response.data.data;
};
