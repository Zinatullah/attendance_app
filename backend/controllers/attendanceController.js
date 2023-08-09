const asyncHandler = require("express-async-handler");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

const getSingleUser = asyncHandler(async (req, res) => {
  const user_id = req.params.id;
  const query = `select * from device_users where user_id = ${user_id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(404).json({ message: "User not found!!!" });
    } else {
      res.status(201).json(result);
    }
  });
});

const getMultipleUsers = asyncHandler(async (req, res) => {
  const query = "select * from device_users";
  connection.query(query, (err, result) => {
    if (err) {
      res.json({ message: "Users not found, an error occured!!!" });
    } else {
      res.status(201).json(result);
    }
  });
});

const getSingleUserAttendance = asyncHandler(async (req, res) => {
  const user_id = req.params.id;
  // console.log(req.params)
  const query_important = `SELECT year, month, day, MIN(time) AS entry_time, MAX(time) AS exit_time FROM ( SELECT * FROM device_attendances WHERE user_id = ${user_id} ORDER BY day) t GROUP BY year, month, day HAVING COUNT(*) >= 2 ORDER BY year, month, day ASC`;

  // `SELECT year, month, day, MAX(time) AS entry_time , MIN(time) AS exit_time FROM (SELECT * from test1 where user_id = 23 order by day) t GROUP BY day HAVING COUNT(*) >= 2 ORDER BY t.day ASC`;
  // `SELECT year, month, day, MAX(time) AS entry_time , MIN(time) AS exit_time FROM (SELECT * from test1 where user_id = ${user_id} order by day) t GROUP BY day HAVING COUNT(*) >= 2 ORDER BY t.day ASC`;
  // `SELECT year, month, day, MIN(time) AS entry_time , MAX(time) AS exit_time FROM (SELECT * from device_attendances where user_id = ${user_id} order by day) t GROUP BY day HAVING COUNT(*) >= 2 ORDER BY t.day ASC`;
  // `SELECT t.year, t.month, t.day, MIN(t.time) AS entry_time, MAX(t.time) AS exit_time FROM ( SELECT da1.year, da1.month, da1.day, da1.time FROM device_attendances da1 INNER JOIN ( SELECT year, month, day FROM device_attendances WHERE user_id = ${user_id} GROUP BY year, month, day HAVING COUNT(*) >= 2 ) da2 ON da1.year = da2.year AND da1.month = da2.month AND da1.day = da2.day ) t GROUP BY t.year, t.month, t.day ORDER BY t.year, t.month, t.day ASC`;
  // const query = `SELECT * from test1, users where users.user_id = test1.user_id and users.user_id = ${user_id} and test1.user_id = ${user_id}`;
  connection.query(query_important, (err, result) => {
    if (err) {
      res.status(400).json({ message: "No result!!!" });
    } else {
      res.status(201).json(result);
    }
  });

  // res.send("Get single user attendance");
});

//////////////////////////////////////////////////////// Leave Form /////////////////////////////////////////////////////
const leaveForm = asyncHandler(async (req, res) => {
  const { user_id, leave_type, month, start_date, end_date, info } = req.body;
  if (!user_id || !leave_type || !month || !start_date || !end_date || !info) {
    res.status(400).json({ message: "Please fill in all the fields" });
  } else {
    const query = `INSERT INTO leave_form (user_id, leave_type, month, start_date, end_date, info) VALUES (${user_id}, '${leave_type}', ${month}, ${start_date}, ${end_date}, '${info}')`;
    connection.query(query, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "Unknown error occured." });
      }
      if (result) {
        res.status(200).json({ message: "Data stored" });
      }
    });
  }
});

//////////////////////////////////////////////////////// VACATION Check  /////////////////////////////////////////////////////
const vacation = asyncHandler(async (req, res) => {
  const { userId, months } = req.body;
  const query =
    await `SELECT * FROM leave_form where user_id = ${userId} and month = '${months}'`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "No employee found!" });
    }
    res.status(201).json(result);
  });
});

//////////////////////////////////////////////////////// General VACATION /////////////////////////////////////////////////////
const generalLeaveForm = asyncHandler(async (req, res) => {
  const { month, leave_type, start_date, end_date, info } = req.body;

  const query = `INSERT INTO general_leave_form ( leave_type, month, start_date, end_date, info) VALUES ('${leave_type}', ${month}, ${start_date}, ${end_date}, '${info}')`;
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Unknown error occured." });
    }
    if (result) {
      res.status(200).json({ message: "Data stored" });
    }
  });
});

//////////////////////////////////////////////////////// General Vacation Check /////////////////////////////////////////////////////
const generalLeaveCheck = asyncHandler(async (req, res) => {
  const query = await `SELECT * FROM general_leave_form `;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "No vacation found!" });
    }
    res.status(201).json(result);
  });
});

//////////////////////////////////////////////////////// Edit Vacation  /////////////////////////////////////////////////////
const EditleaveForm = asyncHandler(async (req, res) => {
  const { id, month, leave_type, start_date, end_date, info } = req.body;

  const query = `SELECT * FROM leave_form WHERE id = ${id} `;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ message: "User not matched" });
    } else {
      const query = ` UPDATE leave_form SET leave_type=${leave_type}, month=${month}, start_date=${start_date}, end_date=${end_date}, info='${info}' WHERE id = ${id}`;
      connection.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(400)
            .json({ message: "Unknown error occured, please try again" });
        } else {
          res.status(200).json({ message: "Data updated successfully!" });
        }
      });
    }
  });
});
//////////////////////////////////////////////////////// Remove Vacation  /////////////////////////////////////////////////////
const removeVacation = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const query = `DELETE FROM leave_form WHERE id = ${id}`;
  connection.query(query, (error, resutl) => {
    if (error) {
      console.log(error);
      res.status(400).json({message: "Error occured"});
    } else {
      res.status(201).json({message: "Item removed"});
    }
  });
});

module.exports = {
  getSingleUser,
  getMultipleUsers,
  getSingleUserAttendance,
  leaveForm,
  vacation,
  generalLeaveForm,
  generalLeaveCheck,
  EditleaveForm,
  removeVacation,
};
