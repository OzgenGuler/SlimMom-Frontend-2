import { createSlice } from "@reduxjs/toolkit";
import { publicCalculator } from "./operations";

const initialState = {
  isRefreshing: false,
  error: null,
  data: {
    calorie: null,
    notAllowedProducts: null,
  },
};

const publicCalculatorSlice = createSlice({
  name: "publicCalculator",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data.calorie = null;
      state.data.notAllowedProducts = null;
      state.isRefreshing = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publicCalculator.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(publicCalculator.fulfilled, (state, action) => {
        console.log("Payload in reducer:", action.payload);
        state.isRefreshing = false;
        state.data.calorie = action.payload.data.dailyRate;
        state.data.notAllowedProducts = action.payload.data.notAllowedProducts;
      })

      .addCase(publicCalculator.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export default publicCalculatorSlice.reducer;
