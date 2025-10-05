import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import friendsSlice from "../features/friends/friendsSlice";
import chatSlice from "../features/chat/chatSlice";
const savedUser = JSON.parse(localStorage.getItem("userDetails"));
const store = configureStore({
  reducer: {
    auth: authSlice,
    friends: friendsSlice,
    chat: chatSlice,
  },
  preloadedState: {
    auth: { userDetails: savedUser, loading: false, error: null },
  },
});

export default store;
