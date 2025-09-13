// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";

const initialState = {
  userDetails: null, // will hold { user, token }
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.userDetails = null;
      state.error = null;
      localStorage.removeItem("userDetails"); // clear storage on logout
    },
    loadUserFromStorage(state) {
      const savedUser = localStorage.getItem("userDetails");
      if (savedUser) {
        state.userDetails = JSON.parse(savedUser);
      }
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        localStorage.setItem("userDetails", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        localStorage.setItem("userDetails", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
