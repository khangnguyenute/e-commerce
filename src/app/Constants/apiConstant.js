export const PATHS = {
  CITIES:
    "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/cities.json",
  DISTRICTS:
    "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/districts",
  WARDS: "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/wards",
  LOCATION:
    "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/location.json",
};

export const LANGUAGE_API_PATH = {
  LANGUAGES: "languages",
  LANGUAGE: "language",
  LANGUAGE_ID: "language/:id",
};

export const AUTH_API_PATH = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGET_PASSWORD: "/auth/forget-password",
  RESET_PASSWORD: "/auth/reset-password",
  REFRESH_TOKEN: "/auth/refresh-token",
  ME: "/auth/me",
  LOGOUT: "/auth/logout",
  CONNECT_SOCIAL: (social, userId) => `/auth/connect/${social}/${userId}/1`,
};

export const COMMON_API_PATH = {
  UPLOAD_IMAGE: "v1/upload",
};

export const ADMIN_USER_PATH = {
  USER: "api/user",
  USERS: "api/users",
  USER_ID_PATH: (id) => `api/user/${id}`,
  USER_FAVORITE_PRODUCT: "api/user/favorite-product",
};

export const BRAND_PATH = {
  BRAND: "api/brand",
  BRANDS: "api/brands",
  BRAND_ID_PATH: (id) => `api/brand/${id}`,
};

export const CATEGORY_PATH = {
  CATEGORY: "api/category",
  CATEGORIES: "api/categories",
  CATEGORY_ID_PATH: (id) => `api/category/${id}`,
};

export const ORDER_PATH = {
  ORDER: "api/order",
  ORDERS: "api/orders",
  ORDER_ID_PATH: (id) => `api/order/${id}`,
};

export const PRODUCT_PATH = {
  PRODUCT: "api/product",
  PRODUCTS: "api/products",
  PRODUCT_ID_PATH: (id) => `api/product/${id}`,
};

export const RATING_PATH = {
  RATING: "api/rating",
  RATINGS: "api/ratings",
  RATING_ID_PATH: (id) => `api/rating/${id}`,
  RATING_PRODUCT_ID_PATH: (id) => `api/rating/product/${id}`,
  DISCUSS_RATING_ID_PATH: (id) => `api/rating/${id}/addDiscuss`,
};

export const VOUCHER_PATH = {
  VOUCHER: "api/voucher",
  VOUCHERS: "api/vouchers",
  VOUCHER_ID_PATH: (id) => `api/voucher/${id}`,
};
