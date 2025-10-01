import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../api.js";
import { toast } from "react-toastify";

export const getTodayDiary = createAsyncThunk(
  "userDiary/getTodayDiary",
  async (_, thunkAPI) => {
    try {
      const todayDate = new Date().toISOString().split("T")[0].toString();
      const response = await api.get(`calorie/private/${todayDate}/all`);
      if (response.status === 200) {
        return { date: todayDate, data: response.data.data };
      } else {
        toast.error("Failed to fetch today's diary");
        return thunkAPI.rejectWithValue("Failed to fetch today's diary");
      }
    } catch (error) {
      toast.warning("Failed to fetch today's diary");
      console.error("Error fetching today's diary:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSelectedDateDiary = createAsyncThunk(
  "userDiary/getSelectedDateDiary",
  async (selectedDate, thunkAPI) => {
    try {
      const response = await api.get(`calorie/private/${selectedDate}/all`);
      if (response.status === 200) {
        return { date: selectedDate, data: response.data.data };
      } else {
        toast.error("Failed to fetch selected date's diary");
        return thunkAPI.rejectWithValue(
          "Failed to fetch selected date's diary"
        );
      }
    } catch (error) {
      toast.warning("Failed to fetch selected date's diary");
      console.error("Error fetching selected date's diary:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const calculator = createAsyncThunk(
  "userDiary/calculator",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/calorie/private", {
        userData: formData,
      });
      if (response.status === 201) {
        toast.success("Calculator data submitted successfully");
        thunkAPI.dispatch(getTodayDiary());
        return response.data.data;
      } else {
        toast.error("Failed to submit calculator data");
        return thunkAPI.rejectWithValue("Failed to submit calculator data");
      }
    } catch (error) {
      toast.warning("Failed to submit calculator data");
      console.error("Error submitting calculator data:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
