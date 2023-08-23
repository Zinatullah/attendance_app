import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./logsService";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Users
export const getUsers = createAsyncThunk(
  "logs/getUser",
  async (thunkAPI) => {
    try {
      return await authService.getUsers();
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

// Employees
export const getEmployees = createAsyncThunk(
  "logs/getEmployees",
  async (thunkAPI) => {
    try {
      return await authService.getEmployees();
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

// Attendance
export const getLogs = createAsyncThunk(
  "logs/getLogs",
  async (thunkAPI) => {
    try {
      return await authService.getLogs();
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

export const logsSlice = createSlice({
  name: "logs",
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

export const { reset } = logsSlice.actions;
export default logsSlice.reducer;
