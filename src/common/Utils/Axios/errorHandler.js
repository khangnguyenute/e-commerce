import { AUTH_PATH } from "@constants/routeConstant";
import { UNAUTHORIZED } from "http-status";
import { keys } from "lodash";

const errorHandler = async (error) => {
  const { response, config } = error;

  let redirectURL = "";

  const redirectWhenError = config?.redirectWhenError;

  if (keys(response).length !== 0) {
    const { status } = response;

    if (redirectWhenError !== false) {
      switch (status) {
        case UNAUTHORIZED: {
          redirectURL = AUTH_PATH.LOGIN;
          break;
        }
        default:
          break;
      }
    }
  }

  if (redirectURL !== "" && (redirectWhenError ?? false)) {
    const currentURL = window.location.pathname;
    if (currentURL !== redirectURL) {
      window.location.href = `${redirectURL}?from=${currentURL}`;
    }
  }

  return Promise.reject(error);
};

export default errorHandler;
