import { configureStore } from "@reduxjs/toolkit";

import commonReducer from "./Slices/commonSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});
