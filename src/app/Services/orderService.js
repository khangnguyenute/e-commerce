import { omit } from "lodash";
import { ORDER_PATH } from "../Constants";
import { axiosInstance } from "@utils/Axios";

const getOrders = async (params) => {
  const newParams = params?.status === "all" ? omit(params, "status") : params;
  const response = await axiosInstance.get(ORDER_PATH.ORDERS, { params: newParams });

  return {
    data: response.data.data,
    meta: {
      total: response.data.total,
    },
  };
};

const getOrderById = async (id) => {
  let response = await axiosInstance.get(ORDER_PATH.ORDER_ID_PATH(id));

  return response.data;
};

const getOrdersByUserId = async (userId, params) => {
  const response = await getOrders({ ...params, customerId: userId });

  return response;
};

const createOrder = async (data) => {
  const response = await axiosInstance.post(ORDER_PATH.ORDER, data);

  return response.data.data;
};

const updateOrderById = async (id, data) => {
  const response = await axiosInstance.put(ORDER_PATH.ORDER_ID_PATH(id), data);

  return response.data.data;
};

const deleteOrderById = async (id) => {
  let response = await axiosInstance.delete(ORDER_PATH.ORDER_ID_PATH(id));

  return response.data.data;
};

export { getOrders, getOrdersByUserId, getOrderById, createOrder, updateOrderById, deleteOrderById };
