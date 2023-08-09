import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import attendanceService from './attendanceService'

// Get user from localStorage

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//////////////////////////////////////////////// Get users //////////////////////////////////////////////////////////////////
export const getUsers = createAsyncThunk('userattendance/getUsers', async (thunkAPI) => {
  try {
    return await attendanceService.getUsers()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//////////////////////////////////////////////// Get user //////////////////////////////////////////////////////////////////
export const getUser = createAsyncThunk('userattendance/getUser', async (thunkAPI) => {
  try {
    return await attendanceService.getUser()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//////////////////////////////////////////////// Get user Atteandance //////////////////////////////////////////////////////////////////
export const getUserAttendance = createAsyncThunk('userattendance/user/:id', async (id, month, thunkAPI) => {
  try {
    return await attendanceService.getUserAttendance(id, month)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//////////////////////////////////////////////// update user //////////////////////////////////////////////////////////////////
export const updateUser = createAsyncThunk('userattendance/updateUser', async (thunkAPI) => {
  try {
    return await attendanceService.updateUser()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})




export const attendanceSlice = createSlice({
  name: 'attendanceSlice',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(register.pending, (state) => {
  //       state.isLoading = true
  //     })
  //     .addCase(register.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.isSuccess = true
  //       state.user = action.payload
  //     })
  //     .addCase(register.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.isError = true
  //       state.message = action.payload
  //       state.user = null
  //     })
  //     .addCase(login.pending, (state) => {
  //       state.isLoading = true
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.isSuccess = true
  //       state.user = action.payload
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.isError = true
  //       state.message = action.payload
  //       state.user = null
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.user = null
  //     })
  // },
})

export const { reset } = attendanceSlice.actions
export default attendanceSlice.reducer
