import { axiosInstance } from "@utils/Axios";

const updateUserById = async (id, data) => {
  const response = await axiosInstance.put(`api/user/${id}`, data);

  return response.data.data;
};

const updateUserStatusById = async (id, status) => {
  const response = await axiosInstance.put(`api/user/${id}`, {
    status,
  });

  return response.data.data;
};

const addFavoriteProduct = async (data) => {
  const response = await axiosInstance.post("api/user/favorite-product", data);

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

export { updateUserById, updateUserStatusById, addFavoriteProduct, addAddress, deleteAddress, editAddress };
