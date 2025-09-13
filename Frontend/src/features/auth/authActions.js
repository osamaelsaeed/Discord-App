// src/features/auth/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../lib/authApi";
import toast from "react-hot-toast";

// login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await login(data);
      toast.success("Login successful 🎉");
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await register(data);
      toast.success("Registered successfully 🎉");
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
