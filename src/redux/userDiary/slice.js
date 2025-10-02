import { createSlice } from "@reduxjs/toolkit";
import {
  calculator,
  getSelectedDateDiary,
  getTodayDiary,
} from "./operations.js";
const initialState = {
  modalView: false,
  calculator_data: {
    left: 0,
    consumed: 0,
    dailyRate: 0,
    nOfNormal: 0,
    notAllowedProducts: [],
    eatenFoods: [],
  },
  selectedDate: new Date().toISOString().split("T")[0].toString(),
  selectedDate_Data: {
    left: 0,
    consumed: 0,
    dailyRate: 0,
    nOfNormal: 0,
    notAllowedProducts: [],
    eatenFoods: [],
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
      state.selectedDate = new Date(new Date.getTime() + 3 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
        .toString();
    });
    builder.addCase(getTodayDiary.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.selectedDate = action.payload.date;
      state.selectedDate_Data = action.payload.data;
    });
    builder.addCase(getSelectedDateDiary.fulfilled, (state, action) => {
      
      state.selectedDate = action.payload.date;
      state.selectedDate_Data = action.payload.data;
    });
    builder.addCase(getSelectedDateDiary.rejected, (state, action) => {
      console.log("Error fetching selected date's diary:", action.payload);
      state.selectedDate = action.payload.date;
      state.selectedDate_Data = {
        left: 0,
        consumed: 0,
        dailyRate: 0,
        nOfNormal: 0,
        notAllowedProducts: [],
        eatenFoods: [],
      };
    });
    builder.addCase(calculator.fulfilled, (state, action) => {
      state.modalView = true;

      state.calculator_data = action.payload;
    });
  },
});

export default userDiarySlice.reducer;
