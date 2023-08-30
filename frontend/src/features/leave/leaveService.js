import axios from 'axios'

const API_URL = 'http://localhost:5000/api/leaves/'


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
  updateGeneralLeave,
  removeGeneralLeave,
  currentMonthGeneralLeaves
}

export default authService
