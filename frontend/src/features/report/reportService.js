import axios from 'axios'

const API_URL = 'http://localhost:5000/api/reports/'


// Monthly Report 
const getMonthReport = async (month) => {
  const response = await axios.get(API_URL + `getMonthReport/${month}`)
  return response.data
}

const authService = {
  getMonthReport
}

export default authService
