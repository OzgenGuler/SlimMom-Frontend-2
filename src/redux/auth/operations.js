import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (_, thunkAPI) => {
    console.log("Login User dispatched");
    try {
      const response = await api.post("auth/login", _);
      console.log("Login response:", response);
      if (response.status === 200) {
        toast.success("Login successful ✔");
        window.location.replace("/diary");
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    console.log("Logout User dispatched");
    return thunkAPI.fulfillWithValue();
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (_, thunkAPI) => {
    console.log("Register User dispatched");
    try {
      const response = await api.post("auth/register", _);
      console.log("Registration response:", response);
      if (response.status === 201) {
        thunkAPI.dispatch(loginUser({ email: _.email, password: _.password }));
        return response.data;
      } else {
        toast.error("Registration failed: " + response.data.message);
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    console.log("Fetch User dispatched");
    try {
      const response = await api.get("auth/profile");
      console.log("Fetch user response:", response);
      if (response.status === 200) {
        const username = response.data.message.split(" ")[2].split("@")[0];
        console.log("User data fetched:", username);

        return username;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
