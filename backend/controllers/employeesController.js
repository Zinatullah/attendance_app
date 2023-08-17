const asyncHandler = require("express-async-handler");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

const setUser = asyncHandler(async (req, res) => {
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

module.exports = {
  setUser,
  // getUsers,
};
