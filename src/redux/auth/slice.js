import {
  createSlice,
  // isFulfilled,
  // isPending,
  // isRejected,
} from "@reduxjs/toolkit";
import { fetchUser, loginUser, logoutUser } from "./operations.js";

const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.username = action.payload;
      });
  },
});

export default authSlice.reducer;
