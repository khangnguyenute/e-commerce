export const AUTH_PATH = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGET_PASSWORD: "/auth/forget-password",
  RESET_PASSWORD: "/auth/reset-password",
};

export const CLIENT_PATH = {
  HOME: "/",
  CART: "/cart",
  PRODUCT: (category) => `/${category}`,
  PRODUCT_DETAIL: (category, productId) => `/${category}/${productId}`,
};

export const PROFILE_PATH = {
  ACCOUNT: "/my/account",
  EDIT_ACCOUNT: (tab) => `/my/account/edit/${tab}`,
  ORDER_HISTORY: "/my/order-history",
  ORDER_HISTORY_TAB: (tab) => `/my/order-history/${tab}`,
  ORDER_HISTORY_DETAIL: (tab, orderId) => `/my/order-history/${tab}/${orderId}`,
  ADDRESS: "/my/address",
  FAVORITE: "/my/favorite",
};

export const ADMIN_PATH = {
  HOME: "/admin",
  USER_MANAGEMENT: "/admin/user-management",
  ORDER_MANAGEMENT: "/admin/order-management",
  BRAND_MANAGEMENT: "/admin/brand-management",
  CATEGORY_MANAGEMENT: "/admin/category-management",
  PRODUCT_MANAGEMENT: "/admin/product-management",
  VOUCHER_MANAGEMENT: "/admin/voucher-management",
  RATING_MANAGEMENT: "/admin/rating-management",
};

export const HOME_PATH = {
  HOME: "/",
  ABOUT: "/about",
  BLOGS: "/blogs",
  PARTNERS: "/partners",
  CONTACT: "/contact",
  COMPANY: "/company",
  FEATURES: "/features",
  GETTING_STARTED: "/getting-started",
  DOCUMENTATION: "/documentations",
  GUIDE: "/guides",
  FAQ: "/faqs",
  TERM: "/terms",
  NOTICE: "/notices",
  CLAIM: "/claims",
  NOT_FOUND: "/*",
};
