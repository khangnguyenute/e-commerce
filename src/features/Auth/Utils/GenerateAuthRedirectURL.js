import { ADMIN_PATH, CLIENT_PATH } from "@constants/routeConstant";

const generateAuthRedirectURL = (role, forceRedirectURL) => {
  if (forceRedirectURL) {
    return forceRedirectURL;
  }

  if (role === "admin") {
    return ADMIN_PATH.HOME;
  }

  return CLIENT_PATH.HOME;
};

export { generateAuthRedirectURL };
