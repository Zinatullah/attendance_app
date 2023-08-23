import axios from "axios";
const API_URL = "http://localhost:5000/api/";

//////////////////////////////////////////        Get users          ///////////////////////////////////////////////////////////////
const getUser = async () => {
  const response = await axios.get(API_URL + "userattendance/getUser");
  return response.data;
};

//////////////////////////////////////////        Get users          ///////////////////////////////////////////////////////////////
const getUsers = async () => {
  const response = await axios.get(API_URL + "userattendance/getUsers");
  return response.data;
};


//////////////////////////////////////////        Get users Attendance          ///////////////////////////////////////////////////////////////

const getUserAttendance = async (id, month) => {
  const response = await axios.get(API_URL + `userattendance/user/${id}`);
  return response.data;
};


//////////////////////////////////////////////    Update user   /////////////////////////////////////////////////////////////////////
const updateUser = async () => {
  const response = await axios.get(API_URL + "userattendance/updateUser");

  return response.data;
};

const attendanceService = {
  getUsers,
  getUser,
  getUserAttendance,
  updateUser,
};

export default attendanceService;
