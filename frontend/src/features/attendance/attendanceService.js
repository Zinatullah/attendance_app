import axios from "axios";
const API_URL = "http://localhost:5000/api/userattendances/";

//////////////////////////////////////////        Get all users          ///////////////////////////////////////////////////////////////
const getmultipleusers = async () => {
  const response = await axios.get(API_URL + "getmultipleusers");
  return response.data;
};

//////////////////////////////////////////        Get single user       ///////////////////////////////////////////////////////////////
const getsingleuser = async (id) => {
  const response = await axios.get(API_URL + `getsingleuser/${id}`);
  return response.data;
};


//////////////////////////////////////////        Get single users Attendance          ///////////////////////////////////////////////////////////////

const getsingleuserattendance = async (userData) => {
  const response = await axios.post(API_URL + `getsingleuserattendance`,  userData);
  return response.data;
};

//////////////////////////////////////////        Leave form          ///////////////////////////////////////////////////////////////
const leaveForm = async (userData) => {
  const response = await axios.post(API_URL + 'leaveForm', userData)
  return response.data
}
//////////////////////////////////////////       Leave Check         ///////////////////////////////////////////////////////////////
const vacation = async (check_vacation) => {
  const response = await axios.post(API_URL + `vacation`, check_vacation)
  return response.data
}

//////////////////////////////////////////      General Leave form          ///////////////////////////////////////////////////////////////
const generalLeaveForm = async (userData) => {
  const response = await axios.post(API_URL + 'generalLeaveForm', userData)
  return response.data
}
//////////////////////////////////////////       General Vacation Check         ///////////////////////////////////////////////////////////////
const generalLeaveCheck = async (check_vacation) => {
  const response = await axios.post(API_URL + `generalLeaveCheck`, check_vacation)
  return response.data
}

//////////////////////////////////////////       Edit Vacation          ///////////////////////////////////////////////////////////////
const EditleaveForm = async (userData) => {
  const response = await axios.put(API_URL + `EditleaveForm`, userData)
  return response.data
}

//////////////////////////////////////////       Edit Vacation          ///////////////////////////////////////////////////////////////
const removeVacation = async (userData) => {
  const response = await axios.put(API_URL + `removeVacation`, userData)
  // return response.data
}

const attendanceService = {
  getmultipleusers,
  getsingleuser,
  getsingleuserattendance,
  leaveForm,
  vacation,
  generalLeaveCheck,
  generalLeaveForm,
  EditleaveForm,
  removeVacation
};

export default attendanceService;
