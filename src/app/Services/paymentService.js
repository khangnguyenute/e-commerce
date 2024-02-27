import { axiosInstance } from "@utils/Axios";

const createMomoPayment = async (data) => {
  return axiosInstance.post("payment/paymentUrl", data);
};

export { createMomoPayment };
