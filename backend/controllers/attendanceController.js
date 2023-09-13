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
  const query = `select * from all_users where user_id = ${user_id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(404).json({ message: "User not found!!!" });
    } else {
      res.status(201).json(result);
    }
  });
});

const getMultipleUsers = asyncHandler(async (req, res) => {
  const query = "select * from all_users ";
  connection.query(query, (err, result) => {
    if (err) {
      res.json({ message: "Users not found, an error occured!!!" });
    } else {
      console.log();
      res.status(201).json(result);
    }
  });
});

const getSingleUserAttendance = asyncHandler(async (req, res) => {
  const { id, month } = req.body;
  const query_important = `select * from all_attendances where user_id =${id}  and month = '${month}'`;
  connection.query(query_important, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "No result!!!" });
    } else {
      res.status(201).json(result);
    }
  });
});

//////////////////////////////////////////////////////// Leave Form /////////////////////////////////////////////////////
const leaveForm = asyncHandler(async (req, res) => {
  const { user_id, leave_type, month, start_date, end_date, info } = req.body;
  if (!user_id || !leave_type || !month || !start_date || !end_date || !info) {
    res.status(400).json({ message: "Please fill in all the fields" });
  } else {
    const query = `INSERT INTO leave_form (user_id, leave_type, month, start_date, end_date, info) VALUES (${user_id}, '${leave_type}', '${month}', ${start_date}, ${end_date}, '${info}')`;
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
  const { id, month } = req.body;
  const query = await `SELECT * FROM leave_form where user_id = ${id} and month = '${month}'`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "No employee found!" });
    }
    res.status(201).json(result);
  });
});

//////////////////////////////////////////////////////// Single month vacations  /////////////////////////////////////////////////////
const getAllvacation = asyncHandler (async (req, res)=>{
  const {current_month} = req.body

  const query = `create or replace view person_vacation as SELECT user_id, leave_type, sum(end_date-start_date) as vacation_days FROM leave_form where month = '${current_month}' GROUP by user_id, leave_type`
  
  connection.query(query, (error, result)=>{
    if(error){
      console.log(error);
      res.status(400).json({message: "نا معلومه مشکل رامنځته شوی"})
    }else {
      res.status(201).json({message: "کړنه ترسره شوه"})
    }
  })
})

//////////////////////////////////////////////////////// General VACATION /////////////////////////////////////////////////////
const generalLeaveForm = asyncHandler(async (req, res) => {
  const { month, leave_type, start_date, end_date, info } = req.body;
  const query = `INSERT INTO general_leave_form ( leave_type, month, start_date, end_date, info) VALUES ('${leave_type}', '${month}', ${start_date}, ${end_date}, '${info}')`;
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
      const query = ` UPDATE leave_form SET leave_type='${leave_type}', month='${month}', start_date=${start_date}, end_date=${end_date}, info='${info}' WHERE id = ${id}`;
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
      res.status(400).json({ message: "Error occured" });
    } else {
      res.status(201).json({ message: "Item removed" });
    }
  });
});

module.exports = {
  getSingleUser,
  getMultipleUsers,
  getSingleUserAttendance,
  leaveForm,
  vacation,
  getAllvacation,
  generalLeaveForm,
  generalLeaveCheck,
  EditleaveForm,
  removeVacation,
};
