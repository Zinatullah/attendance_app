import axios from "axios";

const API_URL = "http://localhost:5000/api/employees/";

// Create new goal
const setUser = async (userData) => {
  console.log(userData)
  const response = await axios.post(API_URL+'register', userData);
  return response.data;
};
// Get user goals
// const getGoals = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }

//   const response = await axios.get(API_URL, config)
//   return response.data
// }

// Delete user goal
// const deleteGoal = async (goalId, token) => {
//   console.log(token)
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }

//   const response = await axios.delete(API_URL  + goalId, config)
//   return response.data
// }

const employeesService = {
  setUser,
  // getGoals,
  // deleteGoal
};

export default employeesService;
