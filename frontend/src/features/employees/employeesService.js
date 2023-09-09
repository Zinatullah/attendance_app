import axios from "axios";

const API_URL = "/api/employees/";

/////////////////////////////////////////    Set Employee       ////////////////////////////////////////////////////
const setUser = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

/////////////////////////////////////////    Get Employees       ////////////////////////////////////////////////////
const getEmployees = async () => {
  const response = await axios.get(API_URL + "getEmployees");
  return response.data;
};
/////////////////////////////////////////    updateEmployee Employees       ////////////////////////////////////////////////////
const updateEmployee = async (userData) => {
  const response = await axios.post(API_URL + "updateEmployee", userData);
  return response.data;
};
/////////////////////////////////////////    Get Employees       ////////////////////////////////////////////////////
const removeEmployee = async (userData) => {
  const response = await axios.post(API_URL + "removeEmployee", userData);
  return response.data;
};

const employeesService = {
  setUser,
  getEmployees,
  updateEmployee,
  removeEmployee
};

export default employeesService;
