const asyncHandler = require("express-async-handler");
const mysql = require("mysql");
const XLSX = require("xlsx");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

//////////////////////////////////////////////////////// Monthly report  /////////////////////////////////////////////////////
const getMonthReport = asyncHandler(async (req, res) => {
  const { month } = req.params;
  const query = `create or replace view monthly_attendance as SELECT id, user_id, day, month, year, min(time) as entery_time, max(time) exit_time FROM device1_attendances where month = '${month}' and year = 1402 group by day, user_id HAVING count(day) >= 2
  `;
  connection.query(query, (error, resutl) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Error occured" });
    } else {
      const query = `SELECT name, month, monthly_attendance.user_id, count(day) as days, entery_time, exit_time FROM monthly_attendance, device1_users WHERE monthly_attendance.user_id = device1_users.user_id group by user_id`;
      connection.query(query, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ message: "Unknow error occured" });
        } else {
          res.status(201).json(result);
        }
      });
    }
  });
});
module.exports = {
  getMonthReport,
};
