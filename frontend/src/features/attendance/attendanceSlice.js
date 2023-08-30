import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import attendanceService from "./attendanceService";

// Get user from localStorage
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//////////////////////////////////////////////// Get all users //////////////////////////////////////////////////////////////////
export const getmultipleusers = createAsyncThunk(
  "userattendances/getmultipleusers",
  async (thunkAPI) => {
    try {
      return await attendanceService.getmultipleusers();
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
//////////////////////////////////////////////// Get single user //////////////////////////////////////////////////////////////////
export const getsingleuser = createAsyncThunk(
  "userattendances/getsingleuser",
  async (id, thunkAPI) => {
    try {
      return await attendanceService.getsingleuser(id);
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
//////////////////////////////////////////////// Get single user Atteandance //////////////////////////////////////////////////////////////////
export const getsingleuserattendance = createAsyncThunk(
  "userattendances/getsingleuserattendance",
  async (userData, thunkAPI) => {
    try {
      return await attendanceService.getsingleuserattendance(userData);
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
////////////////////////////////////////////////  Leave Form    //////////////////////////////////////////////////////////////////
export const leaveForm = createAsyncThunk(
  "userattendances/leaveForm",
  async (user, thunkAPI) => {
    try {
      return await attendanceService.leaveForm(user);
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
////////////////////////////////////////////////  Vacation Check    //////////////////////////////////////////////////////////////////
export const vacation = createAsyncThunk(
  "userattendances/vacation",
  async (check_vacation, thunkAPI) => {
    try {
      return await attendanceService.vacation(check_vacation);
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
////////////////////////////////////////////////  Vacation Check    //////////////////////////////////////////////////////////////////
export const getAllvacation = createAsyncThunk(
  "userattendances/getAllvacation",
  async (user_data, thunkAPI) => {
    try {
      return await attendanceService.getAllvacation(user_data);
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


////////////////////////////////////////////////  General Leave Form    //////////////////////////////////////////////////////////////////
export const generalLeaveForm = createAsyncThunk(
  "userattendances/generalLeaveForm",
  async (userData, thunkAPI) => {
    try {
      return await attendanceService.generalLeaveForm(userData);
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

////////////////////////////////////////////////  General Leave Check     //////////////////////////////////////////////////////////////////
export const generalLeaveCheck = createAsyncThunk(
  "userattendances/generalLeaveCheck",
  async (check_vacation, thunkAPI) => {
    try {
      return await attendanceService.generalLeaveCheck(check_vacation);
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

////////////////////////////////////////////////  Edit Leave      //////////////////////////////////////////////////////////////////
export const EditleaveForm = createAsyncThunk(
  "userattendances/EditleaveForm",
  async (userData, thunkAPI) => {
    try {
      return await attendanceService.EditleaveForm(userData);
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

////////////////////////////////////////////////  General Leave Check     //////////////////////////////////////////////////////////////////
export const removeVacation = createAsyncThunk(
  "userattendances/removeVacation",
  async (userData, thunkAPI) => {
    try {
      return await attendanceService.removeVacation(userData);
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

export const attendanceSlice = createSlice({
  name: "attendance",
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
      .addCase(getmultipleusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getmultipleusers.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getmultipleusers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(leaveForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(leaveForm.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(leaveForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(vacation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(vacation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(vacation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(generalLeaveForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generalLeaveForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(generalLeaveForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(EditleaveForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditleaveForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(EditleaveForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;
