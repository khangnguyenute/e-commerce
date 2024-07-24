import { CLIENT_PATH } from "@constants/routeConstant";

const generateAuthRedirectURL = (role, forceRedirectURL) => {
  if (forceRedirectURL) {
    return forceRedirectURL;
  }

  return CLIENT_PATH.HOME;
};

export { generateAuthRedirectURL };
