import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.get(API_URL + 'register', userData)
  return response.data
}


// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    console.log(response.data)
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}


// Get all users
const getAllUsers = async () => {
  const response = await axios.get(API_URL + 'getallusers')
  return response.data
}

// Delete User //
const deleteUser = async (userData) => {
  console.log(userData)
  const response = await axios.post(API_URL + 'deleteUser/:id', userData)

  return response.data
}


// Update user
const updateUser = async (userData) => {
  const response = await axios.post(API_URL + 'updateUser', userData)
  return response.data
}

// Update Password 
const updatePassword = async (userData) => {
  const response = await axios.post(API_URL + 'updatePassword', userData)
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  getAllUsers,
  deleteUser,
  updateUser,
  updatePassword
}

export default authService
