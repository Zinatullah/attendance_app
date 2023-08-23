import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeesService from "./employeesService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register new employee
export const setUser = createAsyncThunk(
  "employee/register",
  async (userData, thunkAPI) => {
    try {
      return await employeesService.setUser(userData);
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

// Get all employees
export const getEmployees = createAsyncThunk(
  "emplyees/getemployees",
  async (thunkAPI) => {
    try {
      return await employeesService.getEmployees();
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
// Update employees
export const updateEmployee = createAsyncThunk(
  "emplyees/updateEmployee",
  async (userData, thunkAPI) => {
    try {
      return await employeesService.updateEmployee(userData);
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
// Remove employees
export const removeEmployee = createAsyncThunk(
  "emplyees/removeEmployee",
  async (userData, thunkAPI) => {
    try {
      return await employeesService.removeEmployee(userData);
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


export const employeesSlice = createSlice({
  name: "employees",
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
      .addCase(setUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(setUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

    
  },
});

export const { reset } = employeesSlice.actions;
export default employeesSlice.reducer;
