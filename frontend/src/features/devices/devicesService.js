import axios from "axios";
const API_URL = "http://localhost:5000/api/devices/";

//////////////////////////////////////////        Get Users       ///////////////////////////////////////////////////////////////
const getUsers = async (id) => {
  const response = await axios.get(API_URL + `getUsers/${id}`);
  return response.data;
};

//////////////////////////////////////////        Get Users attendance        ///////////////////////////////////////////////////////////////
const getAttendance = async (id) => {
  const response = await axios.get(API_URL + `getAttendance/${id}`);
  return response.data;
};

//////////////////////////////////////////        clear attendances       ///////////////////////////////////////////////////////////////
const clearAttendances = async (id) => {
  const response = await axios.get(API_URL + `clearAttendances/${id}`);
  return response.data;
};

//////////////////////////////////////////        Get Status of the device       ///////////////////////////////////////////////////////////////
const getDeviceStatus = async (id) => {
  const response = await axios.get(API_URL + `getDeviceStatus/${id}`);
  return response.data;
};

//////////////////////////////////////////        Get all Devices status       ///////////////////////////////////////////////////////////////
const getAlldeveicesStatus = async () => {
  const response = await axios.get(API_URL + `getAlldeveicesStatus`);
  return response.data;
};
//////////////////////////////////////////        Get all users from devices      ///////////////////////////////////////////////////////////////
const getUsersFromAllDevices = async () => {
  const response = await axios.get(API_URL + `getUsersFromAllDevices`);
  return response.data;
};
//////////////////////////////////////////        Get all attendances from devices       ///////////////////////////////////////////////////////////////
const getAttendancesFromAllDevices = async () => {
  const response = await axios.get(API_URL + `getAttendancesFromAllDevices`);
  return response.data;
};
//////////////////////////////////////////////// Get Count Attendances From All Devices //////////////////////////////////////////////////////////////////
const getCountAttendancesFromAllDevices = async () => {
  const response = await axios.get(
    API_URL + `getCountAttendancesFromAllDevices`
  );
  return response.data;
};

const devicesService = {
  getUsers,
  getAttendance,
  clearAttendances,
  getDeviceStatus,
  getAlldeveicesStatus,
  getUsersFromAllDevices,
  getAttendancesFromAllDevices,
  getCountAttendancesFromAllDevices,
};

export default devicesService;
