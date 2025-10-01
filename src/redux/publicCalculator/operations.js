import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";
import { toast } from "react-toastify";

export const publicCalculator = createAsyncThunk(
  "publicCalculator/calculator",
  async (_, thunkAPI) => {
    try {
      const response = await api.post("calorie/public", { userData: _ });
      console.log("Response from publicCalculator operation:", response);
      if (response.status === 201) {
        toast.success("Calculation successful ✔");
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Error in publicCalculator operation:", error);
      toast.error("Calculator: " + error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
