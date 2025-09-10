// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice"; // adjust the path

export const store = configureStore({
  reducer: {
    auth: authReducer, // now "auth" state is available
  },
  devTools: true, // optional, but helpful
});
