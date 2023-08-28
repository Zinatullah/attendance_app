const asyncHandler = require("express-async-handler");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

const setEmployee = asyncHandler(async (req, res) => {
  const { user_id, firstName, lastName, fathername, department } = req.body;
  const searchQuery = `select user_id from employees_info where user_id = ${user_id}`;
  connection.query(searchQuery, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Unknown error occured" });
    } else if (result.length > 0) {
      res.status(400).json({ message: "User_ID already exist" });
    } else {
      const query = `INSERT INTO employees_info( user_id, name, lastname, fathername, department) VALUES ('${user_id}', '${firstName}', '${lastName}', '${fathername}', '${department}')`;
      connection.query(query, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ message: "Invalid data" });
        }
        res.status(200).json({ message: "Data inserted succeessfully!" });
      });
    }
  });
});

const getEmployees = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM `employees_info` order by user_id";
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "هېڅ کارمند پیدا نشو" });
    } else {
      res.status(201).json(result);
    }
  });
});

const updateEmployee = asyncHandler(async (req, res) => {
  const { id, user_id, firstName, lastName, fathername, department } = req.body;
  const query = `UPDATE employees_info SET   user_id = ${user_id}, name = '${firstName}', lastname = '${lastName}', fathername = '${fathername}', department = '${department}' WHERE user_id = ${id}`;
  connection.query(query, (error, result)=>{
    if(error){
      console.log(error);
      res.status(404).json({message: "کارکوونکی پیدا نشو"})
    }else {
      res.status(201).json({message: "Success"})
    }
  })
});

const removeEmployee = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const query = `DELETE FROM employees_info WHERE user_id = ${id}`;
  console.log(query);
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(404).json({ message: "کارکوونکی پیدا نشو" });
    } else {
      res.status(201).json({ message: "Success" });
    }
  });
});

module.exports = {
  setEmployee,
  getEmployees,
  updateEmployee,
  removeEmployee,
};
