export const BooleanEnum = {
  true: "true",
  false: "false",
};

export const UserRoleEnum = {
  admin: "admin",
  user: "user",
};

export const OrderStatusEnum = {
  processing: "processing",
  packed: "packed",
  inTransit: "inTransit",
  delivered: "delivered",
  canceled: "canceled",
};

export const OrderTotalPriceEnum = {
  0: {
    key: "Dưới 10 triệu",
    value: "0-10000000",
  },
  1: {
    key: "Từ 10 đến 20 triệu",
    value: "10000000-20000000",
  },
  2: {
    key: "Từ 20 đến 50 triệu",
    value: "20000000-50000000",
  },
  3: {
    key: "Từ 50 đến 100 triệu",
    value: "50000000-100000000",
  },
  4: {
    key: "Trên 100.000.000đ",
    value: "100000000-999999999",
  },
};

export const ProductPriceEnum = {
  0: {
    key: "Dưới 2 triệu",
    value: "0-2000000",
  },
  1: {
    key: "Từ 2 đến 7 triệu",
    value: "2000000-7000000",
  },
  2: {
    key: "Từ 7 đến 13 triệu",
    value: "7000000-13000000",
  },
  3: {
    key: "Từ 13 đến 25 triệu",
    value: "13000000-20000000",
  },
  4: {
    key: "Trên 25.000.000đ",
    value: "25000000-99999999",
  },
};

export const ramEnum = [
  {
    value: "2 GB",
    label: "2 GB",
  },
  {
    value: "3 GB",
    label: "3 GB",
  },
  {
    value: "4 GB",
    label: "4 GB",
  },
  {
    value: "6 GB",
    label: "6 GB",
  },
  {
    value: "8 GB",
    label: "8 GB",
  },
  {
    value: "12 GB",
    label: "12 GB",
  },
  {
    value: "16 GB",
    label: "16 GB",
  },
  {
    value: "32 GB",
    label: "32 GB",
  },
  {
    value: "64 GB",
    label: "64 GB",
  },
  {
    value: "128 GB",
    label: "128 GB",
  },
  {
    value: "256 GB",
    label: "256 GB",
  },
  {
    value: "128 GB",
    label: "128 GB",
  },
];

export const SortEnum = {
  0: {
    label: "Giá thấp đến cao",
    key: "price",
    value: false,
  },
  1: {
    label: "Giá cao đến thấp",
    key: "price",
    value: true,
  },
  2: {
    label: "% Giảm giá thấp đến cao",
    key: "discount",
    value: false,
  },
  3: {
    label: "% Giảm giá cao đến thấp",
    key: "discount",
    value: true,
  },
};

export const DiscountEnum = {
  warrantyPackage: "warrantyPackage",
  dataPackage: "dataPackage",
  paymentDiscount: "paymentDiscount",
};
