var mysql = require("mysql");
const asyncHandler = require("express-async-handler");
const ZKLib = require("qr-zklib");
let zkInstance1 = new ZKLib("192.168.5.26", 4370, 60000, 60000);
let zkInstance2 = new ZKLib("192.168.5.36", 4370, 60000, 60000);
// let zkInstance2 = new ZKLib("192.168.5.69", 4370, 60000, 60000);
let zkInstance3 = new ZKLib("192.168.5.103", 4370, 60000, 60000);
// let zkInstance3 = new ZKLib("192.168.5.36", 4370, 60000, 60000);
// let zkInstance4 = new ZKLib("192.168.5.23", 4370, 60000, 60000);
// let zkInstance4 = new ZKLib("192.168.5.169", 4370, 30000, 30000);

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

//////////////////////////////////////////        Get all users          ///////////////////////////////////////////////////////////////
const getUsers = asyncHandler(async (req, res) => {
  const device_id = req.params.id;
  try {
    if (device_id == 1) {
      await zkInstance1.createSocket();
      const device1 = await zkInstance1.getUsers();
      const truncate_query = "truncate table all_users";
      connection.query(truncate_query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
      });
      device1.data.map((person) => {
        const query = `INSERT INTO all_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
        });
      });
    } else if (device_id == 2) {
      await zkInstance2.createSocket();
      const device2 = await zkInstance2.getUsers();
      const truncate_query = "truncate table all_users";
      await connection.query(truncate_query);
      await device2.data.map((person) => {
        const query = `INSERT INTO all_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
        connection.query(query, (err, result) => {
          if (err) {
            res.status(400).send(err);
          }
        });
      });
    } else if (device_id == 3) {
      await zkInstance3.createSocket();
      const device3 = await zkInstance3.getUsers();

      const truncate_query = "truncate table all_users";
      connection.query(truncate_query);
      device3.data.map((person) => {
        const query = `INSERT INTO all_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
        connection.query(query, (err, result) => {
          if (err) {
            res.status(400).send(err);
          }
        });
      });
    } else if (device_id == 4) {
      await zkInstance4.createSocket();
      const device4 = await zkInstance4.getUsers();

      const truncate_query = "truncate table all_users";
      connection.query(truncate_query);
      device4.data.map((person) => {
        const query = `INSERT INTO all_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
        connection.query(query, (err, result) => {
          if (err) {
            res.status(400).send(err);
          }
        });
      });
    }
    res.status(201).json({ message: "Device is connected" });
  } catch (e) {
    res.status(400).json({ message: "Device is not connected!!!" });
  }
});

//////////////////////////////////////////        Get attendance from single device        ///////////////////////////////////////////////////////////////
const getAttendance = asyncHandler(async (req, res) => {
  const device_id = req.params.id;

  const dateChanger = (value) => {
    let mon = new Date(value).toLocaleString("fa-Af", {
      year: "numeric",
      month: "long",
      day: "numeric",
      nu: "ps",
    });
    return mon;
  };

  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const e2a = (s) => s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

  const p2a = (s) =>
    s.replace(/[۰-۹]/g, (d) => "٠١٢٣٤٥٦٧٨٩"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
  const a2p = (s) =>
    s.replace(/[٠-٩]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);

  const query = `SELECT * FROM grand`;

  try {
    if (device_id == 1) {
      await zkInstance1.createSocket();
      const clearTableQuery = "truncate table device1_attendances";
      connection.query(clearTableQuery);

      const attendance1 = await zkInstance1.getAttendances();
      attendance1.data.map((data) => {
        const user_id = data.deviceUserId ? data.deviceUserId : 100000;

        const recordTime = data.recordTime;
        const day = recordTime.split(" ")[1];
        const month = recordTime.split(" ")[2];
        const year = recordTime.split(" ")[3];

        const date_time = dateChanger(`'${month}' ${day} ${year}`);
        const time = recordTime.split(" ")[4];
        const hijri_day = p2e(date_time.split(" ")[0]);
        const hijri_month = date_time.split(" ")[1];
        const hijri_year = p2e(date_time.split(" ")[2]);

        const query = `INSERT INTO device1_attendances (user_id, year, month, day, time) VALUES (${user_id}, ${hijri_year}, '${hijri_month}', '${hijri_day}', '${time}')`;
        connection.query(query);
      });
    } else if (device_id == 2) {
      await zkInstance2.createSocket();
      const clearTableQuery = "truncate table device2_attendances";
      connection.query(clearTableQuery);

      const attendance = await zkInstance2.getAttendances();
      attendance.data.map((data) => {
        const user_id = data.deviceUserId ? data.deviceUserId : 100000;

        const recordTime = data.recordTime;
        const day = recordTime.split(" ")[1];
        const month = recordTime.split(" ")[2];
        const year = recordTime.split(" ")[3];

        const date_time = dateChanger(`'${month}' ${day} ${year}`);
        const time = recordTime.split(" ")[4];
        const hijri_day = p2e(date_time.split(" ")[0]);
        const hijri_month = date_time.split(" ")[1];
        const hijri_year = p2e(date_time.split(" ")[2]);

        const query = `INSERT INTO device2_attendances (user_id, year, month, day, time) VALUES (${user_id}, ${hijri_year}, '${hijri_month}', '${hijri_day}', '${time}')`;
        connection.query(query);
      });
    } else if (device_id == 3) {
      await zkInstance3.createSocket();
      const clearTableQuery = "truncate table device3_attendances";
      connection.query(clearTableQuery);

      const attendance = await zkInstance3.getAttendances();
      attendance.data.map((data) => {
        const user_id = data.deviceUserId ? data.deviceUserId : 100000;

        const recordTime = data.recordTime;
        const day = recordTime.split(" ")[1];
        const month = recordTime.split(" ")[2];
        const year = recordTime.split(" ")[3];

        const date_time = dateChanger(`'${month}' ${day} ${year}`);
        const time = recordTime.split(" ")[4];
        const hijri_day = p2e(date_time.split(" ")[0]);
        const hijri_month = date_time.split(" ")[1];
        const hijri_year = p2e(date_time.split(" ")[2]);

        const query = `INSERT INTO device3_attendances (user_id, year, month, day, time) VALUES (${user_id}, ${hijri_year}, '${hijri_month}', '${hijri_day}', '${time}')`;
        connection.query(query);
      });
    }
    res.status(201).send({ message: "Data inserted successfully!!!" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Please check the "Device status" first' });
  }
});

////////////////////////////////////        Get Attendance from all devices        ////////////////////////////////////
const allAttendances = asyncHandler(async (req, res) => {
  // const query = `INSERT INTO all_attendances (name, user_id, year, month, day, entery_time, exit_time)
  // select u.name, d.user_id, d.year, d.month, d.day, min(d.time), max(d.time) from device1_attendances as d, device1_users as u where d.year = '1402'and u.user_id = d.user_id GROUP by user_id, d.day, d.month, d.year HAVING count(day) >= 2
  // UNION
  // select u.name, d.user_id, d.year, d.month, d.day, min(d.time), max(d.time) from device2_attendances as d, device2_users as u where d.year = '1402'and u.user_id = d.user_id GROUP by user_id, d.day, d.month, d.year HAVING count(day) >= 2
  // UNION
  // select u.name, d.user_id, d.year, d.month, d.day, min(d.time), max(d.time) from device3_attendances as d, device3_users as u where d.year = '1402'and u.user_id = d.user_id GROUP by user_id, d.day, d.month, d.year HAVING count(day) >= 2
  // `;
  // connection.query(query, (error, result) => {
  //   if (error) {
  //     console.log(error);
  //     res.status(400).json({
  //       message:
  //         "The error occured between All_attendance and three other tables",
  //     });
  //   }
  // });
});

////////////////////////////////////        Get Attendance from all devices        ////////////////////////////////////
const getAttendancesFromAllDevices = asyncHandler(async (req, res) => {
  const clear_query = "truncate table all_attendances";
  connection.query(clear_query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: " Table not found!!!" });
    }
  });
  const clear_query1 = "truncate table filtered_attendance";
  connection.query(clear_query1, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: " Table not found!!!" });
    }
  });
  const query = `INSERT INTO filtered_attendance (name, user_id, year, month, day, entery_time, exit_time) 
  select u.name, d.user_id, d.year, d.month, d.day, min(d.time), max(d.time) from device1_attendances as d, all_users as u where d.year = '1402'and u.user_id = d.user_id GROUP by user_id, d.day, d.month, d.year HAVING count(day) >= 2 
  UNION 
  select u.name, d.user_id, d.year, d.month, d.day, min(d.time), max(d.time) from device2_attendances as d, all_users as u where d.year = '1402'and u.user_id = d.user_id GROUP by user_id, d.day, d.month, d.year HAVING count(day) >= 2 
  UNION
  select u.name, d.user_id, d.year, d.month, d.day, min(d.time), max(d.time) from device3_attendances as d, all_users as u where d.year = '1402'and u.user_id = d.user_id GROUP by user_id, d.day, d.month, d.year HAVING count(day) >= 2
  `;

  connection.query(query);

  const filter_query = `INSERT INTO all_attendances(id, name, user_id, year, month, day, entery_time, exit_time) select id, name, user_id, year, month, day, entery_time, exit_time from filtered_attendance where entery_time < '08:16:00' and exit_time > '12:00:00'`

  connection.query(filter_query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        message:
          "The error occured between All_attendance and three other tables",
      });
    } else {
      console.log(result);
      res.status(200).json({
        message:
          "The error occured between All_attendance and three other tables",
      });
    }
  });
});

/////////////////////////////////////////         Clear attendance           ///////////////////////////////////////////////////

const clearAttendances = asyncHandler(async (req, res) => {
  const device_id = req.params.id;
  try {
    if (device_id == 1) {
      // await zkInstance1.createSocket();
      // console.log(await zkInstance1.clearAttendanceLog());
    } else if (device_id == 2) {
      await zkInstance2.createSocket();
      // console.log(await zkInstance2.clearAttendanceLog());
    } else if (device_id == 3) {
      // await zkInstance3.createSocket();
      // console.log(await zkInstance3.clearAttendanceLog());
    } else if (device_id == 4) {
      // await zkInstance4.createSocket();
      // await zkInstance4.clearAttendanceLog();
    }
    res.status(201).json({ message: "Device is connected" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Device is not connected!!!" });
  }
});
/////////////////////////////////////////         Clear attendance           ///////////////////////////////////////////////////

const getAttendanceCount = asyncHandler(async (req, res) => {
  const device_id = req.params.id;
  try {
    await zkInstance1.createSocket();
    // await zkInstance2.createSocket();
    await zkInstance3.createSocket();

    const device1 = await zkInstance1.getInfo();
    // const device2 = await zkInstance2.getInfo();
    const device3 = await zkInstance3.getInfo();

    const addLogs = (device_id, users, attendance) => {
      const clearQuery = `truncate table device${device_id}_info`;
      connection.query(clearQuery);
      const query = `INSERT INTO device${device_id}_info( users_count, attendance_count) VALUES (${users}, ${attendance})`;
      connection.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "ډیټابیس ته ډېټا داخله نشوه" });
        }
      });
    };
    if (device_id == 1) {
      addLogs(device_id, device1.userCounts, device1.logCounts);
      console.log(device1.userCounts, device1.logCounts);
    } else if (device_id == 2) {
      addLogs(device_id, device2.userCounts, device2.logCounts);
      console.log(device2.userCounts, device2.logCounts);
    } else if (device_id == 3) {
      addLogs(device_id, device3.userCounts, device3.logCounts);
      console.log(device3.userCounts, device3.logCounts);
    }
    res.status(201).json({ message: "Success" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Device is not connected!!!" });
  }
});

/////////////////////////////////////////         Get device status       ///////////////////////////////////////////////////
const getDeviceStatus = asyncHandler(async (req, res) => {
  const device_id = req.params.id;
  try {
    if (device_id == 1) {
      await zkInstance1.createSocket();
    } else if (device_id == 2) {
      await zkInstance2.createSocket();
    } else if (device_id == 3) {
      await zkInstance3.createSocket();
    } else if (device_id == 4) {
      await zkInstance4.createSocket();
    }
    res.status(201).json({ message: "Device is connected" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Device is not connected!!!" });
  }
});

///////////////////////////////////////////  All Logs  ///////////////////////////////////////////////////////////
const getCountAttendancesFromAllDevices = asyncHandler(async (req, res) => {
  try {
    const clearQuery = "truncate table devices_logs";
    connection.query(clearQuery);

    const query = `INSERT INTO devices_logs( users_count, attendance_count) 
      SELECT users_count, attendance_count FROM device1_info 
      UNION
      SELECT users_count, attendance_count FROM device2_info 
      UNION
      SELECT users_count, attendance_count FROM device3_info `;
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Devices not connected" });
  }
  res.status(201).json({ message: "Successfully data inserted" });
});

/////////////////////////////////////////////     Status     /////////////////////////////////////////////////////////
const getAlldeveicesStatus = asyncHandler(async (req, res) => {});

///////////////////////////////////////////  All Users  ///////////////////////////////////////////////////////////
const getUsersFromAllDevices = asyncHandler(async (req, res) => {});

module.exports = {
  getUsers,
  getAttendance,
  allAttendances,
  clearAttendances,
  getDeviceStatus,
  getAttendanceCount,
  getAlldeveicesStatus,
  getUsersFromAllDevices,
  getAttendancesFromAllDevices,
  getCountAttendancesFromAllDevices,
};
