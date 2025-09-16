import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";

const savedUser = JSON.parse(localStorage.getItem("userDetails"));
const store = configureStore({
  reducer: { auth: authSlice },
  preloadedState: {
    auth: { userDetails: savedUser, loading: false, error: null },
  },
});

export default store;
