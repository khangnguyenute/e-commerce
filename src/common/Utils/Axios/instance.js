import axios from "axios";
import { set } from "lodash";

import { authService } from "@services/index";

import { normalizeQuery } from "../Helpers/requestHelpers";
import errorHandler from "./errorHandler.js";
import { getPageLanguage } from "@services/languageService";

export const baseURL = "https://kpshop-backend-5yfh.onrender.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  responseEncoding: "utf8",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": getPageLanguage(),
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    set(request, "headers.Authorization", `Bearer ${authService.getAccessToken()}`);
    request.headers("Access-Control-Allow-Origin", "*");
    request.headers("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    request.headers("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const { params, url } = request;

    if (!params || !url) {
      return request;
    }

    request.params = normalizeQuery(params);
    return request;
  },
  async (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => errorHandler(error, axiosInstance),
);

export default axiosInstance;
