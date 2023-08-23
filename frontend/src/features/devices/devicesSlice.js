import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import attendanceService from './devicesService'

// Get user from localStorage
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


//////////////////////////////////////////////// Users //////////////////////////////////////////////////////////////////
export const getUsers = createAsyncThunk('userattendances/getUsers', async (id, thunkAPI) => {
  try {
    return await attendanceService.getUsers(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//////////////////////////////////////////////// Attendance //////////////////////////////////////////////////////////////////
export const getAttendance = createAsyncThunk('userattendances/getAttendance/', async (id, thunkAPI) => {
  try {
    return await attendanceService.getAttendance(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//////////////////////////////////////////////// Clear //////////////////////////////////////////////////////////////////
export const getAttendanceCount = createAsyncThunk('userattendances/getAttendanceCount', async (id, thunkAPI) => {
  try {
    return await attendanceService.getAttendanceCount(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//////////////////////////////////////////////// Clear //////////////////////////////////////////////////////////////////
export const clearAttendances = createAsyncThunk('userattendances/clearAttendances', async (id, thunkAPI) => {
  try {
    return await attendanceService.clearAttendances(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//////////////////////////////////////////////// status //////////////////////////////////////////////////////////////////
export const getDeviceStatus = createAsyncThunk('userattendances/getDeviceStatus', async (id, thunkAPI) => {
  try {
    return await attendanceService.getDeviceStatus(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//////////////////////////////////////////////// All Devices status //////////////////////////////////////////////////////////////////
export const getAlldeveicesStatus = createAsyncThunk('devices/getAlldeveicesStatus', async (thunkAPI) => {
  try {
    return await attendanceService.getAlldeveicesStatus()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//////////////////////////////////////////////// All devices users //////////////////////////////////////////////////////////////////
export const getUsersFromAllDevices = createAsyncThunk('devices/getUsersFromAllDevices', async (thunkAPI) => {
  try {
    return await attendanceService.getUsersFromAllDevices()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//////////////////////////////////////////////// All devices attendances //////////////////////////////////////////////////////////////////
export const getAttendancesFromAllDevices = createAsyncThunk('devices/getAttendancesFromAllDevices', async (thunkAPI) => {
  try {
    return await attendanceService.getAttendancesFromAllDevices()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//////////////////////////////////////////////// Get Count Attendances From All Devices //////////////////////////////////////////////////////////////////
export const getCountAttendancesFromAllDevices = createAsyncThunk('devices/getCountAttendancesFromAllDevices', async (thunkAPI) => {
  try {
    return await attendanceService.getCountAttendancesFromAllDevices()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const attendanceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAttendance.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAttendanceCount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAttendanceCount.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getAttendanceCount.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(clearAttendances.pending, (state) => {
        state.isLoading = true
      })
      .addCase(clearAttendances.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(clearAttendances.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDeviceStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDeviceStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.devices = action.payload
      })
      .addCase(getDeviceStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAlldeveicesStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAlldeveicesStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(getAlldeveicesStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUsersFromAllDevices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsersFromAllDevices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.devices = action.payload
      })
      .addCase(getUsersFromAllDevices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAttendancesFromAllDevices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAttendancesFromAllDevices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.devices = action.payload
      })
      .addCase(getAttendancesFromAllDevices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCountAttendancesFromAllDevices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCountAttendancesFromAllDevices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.devices = action.payload
      })
      .addCase(getCountAttendancesFromAllDevices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = attendanceSlice.actions
export default attendanceSlice.reducer
