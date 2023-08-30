import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leaveService from "./leaveService";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Update General Leave
export const updateGeneralLeave = createAsyncThunk(
  "leaves/updateGeneralLeave",
  async (user, thunkAPI) => {
    try {
      return await leaveService.updateGeneralLeave(user);
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

// Update General Leave
export const removeGeneralLeave = createAsyncThunk(
  "leaves/removeGeneralLeave",
  async (id, thunkAPI) => {
    try {
      return await leaveService.removeGeneralLeave(id);
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
// Current Month General Leaves
export const currentMonthGeneralLeaves = createAsyncThunk(
  "leaves/currentMonthGeneralLeaves",
  async (user_data, thunkAPI) => {
    try {
      return await leaveService.currentMonthGeneralLeaves(user_data);
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
  name: "leave",
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
    builder
      .addCase(updateGeneralLeave.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGeneralLeave.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateGeneralLeave.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(removeGeneralLeave.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeGeneralLeave.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(removeGeneralLeave.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
