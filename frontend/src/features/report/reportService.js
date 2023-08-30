import axios from "axios";

const API_URL = "http://localhost:5000/api/reports/";
// Daily Report
const getCurrentReport = async (month) => {
  const response = await axios.post(API_URL + `currentReport`, month);
  return response.data;
};

const getDailyReport = async (month) => {
  const response = await axios.post(API_URL + `getDailyReport`, month);
  return response.data;
};

// Monthly Report
const getMonthReport = async (month) => {
  const response = await axios.post(API_URL + `getMonthReport`, month);
  return response.data;
};

// getTwoMonths Report
const getTwoMonths = async (month) => {
  const response = await axios.post(API_URL + `getTwoMonths`, month);
  return response.data;
};

// Friday two months
const getFridays = async (month_data) => {
  const response = await axios.post(API_URL + `getFridays`, month_data);
  return response.data;
};

// Friday single month
const getFriday = async (month_data) => {
  const response = await axios.post(API_URL + `get_Friday`, month_data);
  return response.data;
};

// grandReport
const grandReport = async () => {
  const response = await axios.get(API_URL + `grandReport`);
  return response.data;
};

const authService = {
  getCurrentReport,
  getTwoMonths,
  getDailyReport,
  getMonthReport,
  getFridays,
  getFriday,
  grandReport,
};

export default authService;
