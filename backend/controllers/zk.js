const ZKLib = require("qr-zklib");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

connection.connect((err) => {
  if (err) {
    console.error("There is an error on : ", err.stack);
  } else {
    console.log("Connected successfully");
  }
});

const getUserAttendance = async (myn) => {
  let zkInstance = new ZKLib("192.168.1.202", 4370, 5200, 5000);
  try {
    // Create socket to machine
    await zkInstance.createSocket();
  } catch (e) {
    console.log(e);
    if (e.code === "EADDRINUSE") {
    }
  }

  console.log(myn, "From MYN")

//   const users_attendance = await zkInstance.getAttendances();
//   const users_attendance_array = users_attendance.data;
//   const att_size = await zkInstance.getAttendanceSize();
//   console.log(users_attendance);

//   users_attendance_array.forEach((element) => {
    // user_id = element.deviceUserId;
    // user_date = connection.escape(element.recordTime);

    // console.log(user_id, " : ", user_date);
    // const query = `INSERT INTO \`user_attendance1\`(\`user_id\`, \`date\`) VALUES (${user_id}, ${user_date})`;

    // connection.query(query, (error, result)=>{ if(error){console.error(error)}});
    
//   });
//   console.log("Data inserted successfully")
  connection.end();
};
module.exports = {
  getUserAttendance,
};
