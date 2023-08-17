const asyncHandler = require("express-async-handler");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

//////////////////////////////////////////////////////// Update General Leave  /////////////////////////////////////////////////////
const updateGeneralLeave = asyncHandler(async (req, res) => {
  const { id, month, leave_type, start_date, end_date, info } = req.body;

  const query = ` UPDATE general_leave_form SET leave_type='${leave_type}', month='${month}', start_date=${start_date}, end_date=${end_date}, info='${info}' WHERE id = ${id}`;
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
});

//////////////////////////////////////////////////////// Remove General Leave  /////////////////////////////////////////////////////
const removeGeneralLeave = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM general_leave_form WHERE id = ${id}`;
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
  updateGeneralLeave,
  removeGeneralLeave
};
