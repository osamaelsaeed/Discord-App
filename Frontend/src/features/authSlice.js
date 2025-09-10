import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../lib/authApi";

// Async thunk for login
// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await api.login(userDetails);
      if (response.error) {
        return rejectWithValue(response?.exception?.response?.data);
      }
      const data = response?.data?.userDetails;
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk for register
export const register = createAsyncThunk(
  "auth/register",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await api.register(userDetails);
      if (response.error) {
        return rejectWithValue(response?.exception?.response?.data);
      }
      const data = response?.data?.userDetails;
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    logout: (state) => {
      state.userDetails = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserDetails, logout } = authSlice.actions;
export default authSlice.reducer;
