const asyncHandler = require("express-async-handler");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

//////////////////////////////////////////////////////// Monthly report  /////////////////////////////////////////////////////
const getUsers = asyncHandler(async (req, res) => {
  const query = "SELECT count(*) as users FROM auth_users";
  connection.query(query, (error, result) => {
    if (error) {
      res.status(404).json({ message: "No users" });
    } else {
      res.status(200).json(result);
    }
  });
});

//////////////////////////////////////////////////////// Monthly report  /////////////////////////////////////////////////////
const getEmployees = asyncHandler(async (req, res) => {
  const query =
    "SELECT max(users_count) as employees, sum(attendance_count) as attendances FROM `devices_logs`";
  connection.query(query, (error, result) => {
    if (error) {
      res.status(400).json({ message: "No logs found" });
    } else {
      res.status(200).json(result);
    }
  });
});

//////////////////////////////////////////////////////// Monthly report  /////////////////////////////////////////////////////
const getLogs = asyncHandler(async (req, res) => {});

module.exports = {
  getUsers,
  getEmployees,
  getLogs,
};
