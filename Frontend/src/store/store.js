import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import friendsSlice from "../features/friends/friendsSlice";
const savedUser = JSON.parse(localStorage.getItem("userDetails"));
const store = configureStore({
  reducer: {
    auth: authSlice,
    friends: friendsSlice,
  },
  preloadedState: {
    auth: { userDetails: savedUser, loading: false, error: null },
  },
});

export default store;
