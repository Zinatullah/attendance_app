import axios from 'axios'

const API_URL = 'http://localhost:5000/api/reports/'
// Daily Report 
const getDailyReport = async (month) => {
  const response = await axios.post(API_URL + `getDailyReport`, month)
  return response.data
}

// Monthly Report 
const getMonthReport = async (month) => {
  const response = await axios.post(API_URL + `getMonthReport`, month)
  return response.data
}

const authService = {
  getDailyReport,
  getMonthReport
}

export default authService
