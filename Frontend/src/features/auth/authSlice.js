import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {},
});

export default authSlice.reducer;
