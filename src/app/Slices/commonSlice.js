import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

import vietnamFlag from "../../assets/images/vietnamflag.png";
import englandFlag from "../../assets/images/englandflag.png";

const languages = [
  {
    code: "en",
    name: "english",
    flag: englandFlag,
  },
  {
    code: "vi",
    name: "vietnamese",
    flag: vietnamFlag,
  },
];
const cart = localStorage.getItem("cartItems") !== null ? JSON.parse(localStorage.getItem("cartItems")) : [];
const order = localStorage.getItem("order") !== null ? JSON.parse(localStorage.getItem("order")) : {};

const initialState = {
  languages,
  user: undefined,
  isCollapsed: false,
  cart,
  order,
  all: {
    data: null,
  },
  detail: {
    data: null,
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateUserAvatar: (state, action) => {
      set(state, "user.avatar", action.payload);
    },
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },

    addItem: (state, action) => {
      const newItem = action.payload;
      const indexItem = state.cart.findIndex((e) => e._id === newItem._id);
      if (indexItem !== -1) {
        state.cart[indexItem] = newItem;
      } else {
        state.cart = [...state.cart, newItem];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    updateItem: (state, action) => {
      const updateItem = action.payload;
      const indexItem = state.cart.findIndex((e) => e._id === updateItem._id);
      if (indexItem === -1) {
        return;
      }

      state.cart[indexItem] = updateItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.cart = state.cart.filter((e) => e._id !== item._id);
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cartItems");
    },
    postOrder: (state, action) => {
      state.order = action.payload;
      const orderData = JSON.stringify(action.payload);
      if (!action.payload.payment.paid) {
        localStorage.setItem("order", orderData);
      }
    },
    all: (state, action) => {
      state.all.data = action.payload;
    },
    orderDetail: (state, action) => {
      state.detail.data = action.payload;
    },
  },
});

const { actions, reducer: commonReducer } = commonSlice;

export const {
  setUser,
  updateUser,
  updateUserAvatar,
  toggleSidebar,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  postOrder,
  all,
  orderDetail,
} = actions;

export default commonReducer;
