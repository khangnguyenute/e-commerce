import { axiosInstance } from "@utils/Axios";
import { VOUCHER_PATH } from "../Constants";

const getVouchers = async (params) => {
  const response = await axiosInstance.get(VOUCHER_PATH.VOUCHERS, { params });

  return {
    data: response.data.data,
    meta: {
      total: response.data.total,
    },
  };
};

const createVoucher = async (data) => {
  const response = await axiosInstance.post(VOUCHER_PATH.VOUCHER, data);

  return response;
};

const updateVoucherById = async (id, data) => {
  const response = await axiosInstance.put(VOUCHER_PATH.VOUCHER_ID_PATH(id), data);

  return response;
};

const deleteVoucherById = async (id) => {
  let response = await axiosInstance.delete(VOUCHER_PATH.VOUCHER_ID_PATH(id));

  return response;
};

const checkVoucher = async (name) => {
  let res = await axiosInstance.post("voucher/checkVoucher", name);
  return res;
};

export { getVouchers, createVoucher, updateVoucherById, deleteVoucherById, checkVoucher };
