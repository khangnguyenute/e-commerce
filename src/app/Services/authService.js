import { axiosInstance } from "@utils/Axios";
import { AUTH_API_PATH } from "../Constants";

const getMe = async () =>
  new Promise((resolve, reject) => {
    const user = localStorage.getItem("user");
    if (user) {
      resolve(JSON.parse(user));
    } else {
      reject();
    }
  });

const login = async (data) => {
  const response = await axiosInstance.post(AUTH_API_PATH.LOGIN, data);

  return response.data;
};

const register = async (data) => {
  const response = await axiosInstance.post(AUTH_API_PATH.REGISTER, {
    ...data,
    fullName: data.firstName.concat(" ", data.lastName),
    role: "user",
  });

  return response;
};

const forgetPassword = async (email) => {
  const response = await axiosInstance.post(AUTH_API_PATH.FORGET_PASSWORD, {
    email,
  });

  return response;
};

const resetPassword = async (email, data) => {
  const response = await axiosInstance.post(AUTH_API_PATH.RESET_PASSWORD, {
    email,
    ...data,
  });

  return response;
};

const logOut = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      removeAccessToken();
      removeLocalUser();
      localStorage.removeItem("cartItems");
      resolve();
    }, 1000);
  });

const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};

const setLocalUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null;
  }

  return accessToken;
};

const getLocalUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return user;
};

const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

const removeLocalUser = () => {
  localStorage.removeItem("user");
};

export {
  getMe,
  forgetPassword,
  getAccessToken,
  logOut,
  login,
  register,
  resetPassword,
  setAccessToken,
  removeAccessToken,
  setLocalUser,
  getLocalUser,
  removeLocalUser,
};
