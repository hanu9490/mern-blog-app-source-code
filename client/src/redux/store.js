import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    isLogin: (state) => {
      state.isLogin = true;
    },
    isLogout: (state) => {
      state.isLogin = false;
    },
  },
});

export const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;
