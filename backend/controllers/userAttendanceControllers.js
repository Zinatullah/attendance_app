var mysql = require("mysql");
const asyncHandler = require("express-async-handler");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

//////////////////////////////////////////        Get user          ///////////////////////////////////////////////////////////////
var data;
async function getUser(req, res) {
  const query = `SELECT * FROM \`users\` where id = 1`;
  connection.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    console.log(data)
    return res.status(200).json(data);
  });
} 

//////////////////////////////////////////        Get users Attendance        ///////////////////////////////////////////////////////////////
async function getUserAttendance(req, res) {
  console.log(req.params.id)
  const id = req.params.id;
  // const query = `SELECT * FROM \`users\` where id = ${id}`;
  const query = `SELECT users.id, name, users.user_id, date FROM \`user_attendance\`, users WHERE users.user_id = user_attendance.user_id and users.user_id = ${id}`

  connection.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(200).json(data);
  });
}

//////////////////////////////////////////        Get users          ///////////////////////////////////////////////////////////////

var data;
async function getUsers(req, res) {
  const query = `SELECT * FROM \`users\``;

  connection.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(200).json(data);
  });
}



//////////////////////////////////////////        َUpdate users          ///////////////////////////////////////////////////////////////

async function updateUser(req, res) {
  const query = `SELECT * FROM \`users\` where id = 1`;
  connection.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(200).json(data);
  });
}

module.exports = {
  getUser,
  getUsers,
  getUserAttendance,
  updateUser
};
