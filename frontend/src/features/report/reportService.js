import axios from 'axios'

const API_URL = 'http://localhost:5000/api/reports/'
// Daily Report 
const getCurrentReport = async (month) => {
  const response = await axios.post(API_URL + `currentReport`, month)
  return response.data
}

const getDailyReport = async (month) => {
  const response = await axios.post(API_URL + `getDailyReport`, month)
  return response.data
}

// Monthly Report 
const getMonthReport = async (month) => {
  const response = await axios.post(API_URL + `getMonthReport`, month)
  return response.data
}

// Friday for two months
const getFridays = async (month_data) => {
  const response = await axios.post(API_URL + `getFridays`, month_data )
  return response.data
}


// Friday for two months
const getFriday = async (month_data) => {
  const response = await axios.post(API_URL + `getFriday`, month_data )
  return response.data
}

const authService = {
  getCurrentReport,
  getDailyReport,
  getMonthReport,
  getFridays,
  getFriday
}

export default authService
