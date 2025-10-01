import { createSlice } from "@reduxjs/toolkit";
import { calculator, getTodayDiary } from "./operations.js";

const initialState = {
  modalView: false,
  data: {
    left: 0,
    consumed: 0,
    dailyRate: 0,
    nOfNormal: 0,
    notAllowedProducts: [],
    eatenProducts: [],
  },
  selectedDate: null,
  selectedDate_Data: {
    left: 0,
    consumed: 0,
    dailyRate: 0,
    nOfNormal: 0,
    notAllowedProducts: [],
    eatenProducts: [],
  },
};

const userDiarySlice = createSlice({
  name: "userDiary",
  initialState,
  reducers: {
    modalResetData: (state) => {
      state.modalView = false;
    },
    setSelectedDate_Data(state, action) {
      state.selectedDate_Data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodayDiary.pending, (state) => {
      state.selectedDate = new Date().toISOString().split("T")[0].toString();
    });
    builder.addCase(getTodayDiary.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.selectedDate = action.payload.date;
      state.selectedDate_Data = action.payload.data;
    });
    builder.addCase(calculator.fulfilled, (state) => {
      state.modalView = true;
    });
  },
});

export default userDiarySlice.reducer;
