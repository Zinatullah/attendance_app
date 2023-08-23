import axios from 'axios'

const API_URL = 'http://localhost:5000/api/logs/'

// Users 
const getUsers = async () => {
  const response = await axios.get(API_URL + `getUsers`)
  return response.data
}

// Employees 
const getEmployees = async () => {
  const response = await axios.get(API_URL + `getEmployees`)
  return response.data
}

// Logs
const getLogs = async () => {
  const response = await axios.get(API_URL + `getLogs`)
  return response.data
}

const authService = {
  getUsers,
  getEmployees,
  getLogs
}

export default authService
