import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./reportService";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Current report
export const getCurrentReport = createAsyncThunk(
  "reports/getCurrentReport",
  async (month, thunkAPI) => {
    try {
      return await authService.getCurrentReport(month);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Daily report
export const getDailyReport = createAsyncThunk(
  "reports/getDailyReport",
  async (month, thunkAPI) => {
    try {
      return await authService.getDailyReport(month);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Monthly report
export const getMonthReport = createAsyncThunk(
  "reports/getMonthReport",
  async (month, thunkAPI) => {
    try {
      return await authService.getMonthReport(month);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fridays
export const getFridays = createAsyncThunk(
  "reports/getFridays",
  async (month_data, thunkAPI) => {
    try {
      return await authService.getFridays(month_data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Fridays

export const getFriday = createAsyncThunk(
  "reports/getFriday",
  async (month_data, thunkAPI) => {
    try {
      return await authService.getFriday(month_data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
