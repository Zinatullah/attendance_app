import axios from 'axios'

const API_URL = '/api/leaves/'


// single User All Leaves
const singleUserAllLeaves = async (userData) => {

  console.log(userData)
  
  const response = await axios.put(API_URL + 'singleUserAllLeaves', userData)
  return response.data
}

// Update General Leave  
const updateGeneralLeave = async (userData) => {
  const response = await axios.put(API_URL + 'updateGeneralLeave', userData)
  return response.data
}

// Remove Leave 
const removeGeneralLeave = async (id) => {
  const response = await axios.post(API_URL + `removeGeneralLeave/${id}`)
  return response.data
}

// Current Month General Leaves
const currentMonthGeneralLeaves = async (userData) => {
  const response = await axios.post(API_URL + 'currentMonthGeneralLeaves', userData)
  return response.data
}
const authService = {
  singleUserAllLeaves,
  updateGeneralLeave,
  removeGeneralLeave,
  currentMonthGeneralLeaves
}

export default authService
