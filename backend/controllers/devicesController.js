var mysql = require("mysql");
const asyncHandler = require("express-async-handler");
const ZKLib = require("qr-zklib");
let zkInstance1 = new ZKLib("192.168.5.20", 4370, 60000, 60000);
let zkInstance2 = new ZKLib("192.168.5.21", 4370, 60000, 60000);
let zkInstance3 = new ZKLib("192.168.5.36", 4370, 60000, 60000);
let zkInstance4 = new ZKLib("192.168.5.23", 4370, 60000, 60000);
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
      const truncate_query = "truncate table device_users";
      connection.query(truncate_query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
      });
      device1.data.map((person) => {
        const query = `INSERT INTO device_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
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
      const truncate_query = "truncate table device_users";
      await connection.query(truncate_query);
      await device2.data.map((person) => {
        const query = `INSERT INTO device_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
        connection.query(query, (err, result) => {
          if (err) {
            res.status(400).send(err);
          }
        });
      });
    } else if (device_id == 3) {
      await zkInstance3.createSocket();
      const device3 = await zkInstance3.getUsers();

      const truncate_query = "truncate table device_users";
      connection.query(truncate_query);
      device3.data.map((person) => {
        const query = `INSERT INTO device_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
        connection.query(query, (err, result) => {
          if (err) {
            res.status(400).send(err);
          }
        });
      });
    } else if (device_id == 4) {
      await zkInstance4.createSocket();
      const device4 = await zkInstance4.getUsers();

      const truncate_query = "truncate table device_users";
      connection.query(truncate_query);
      device4.data.map((person) => {
        const query = `INSERT INTO device_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
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

//////////////////////////////////////////        Get all users Attendance        ///////////////////////////////////////////////////////////////
const getAttendance = asyncHandler(async (req, res) => {
  const device_id = req.params.id;
  try {
    if (device_id == 1) {
      await zkInstance1.createSocket();
      const clearTableQuery = "truncate table device_attendances";
      connection.query(clearTableQuery);
      const attendance1 = await zkInstance1.getAttendances();
      await attendance1.data.map((person, index) => {
        const user_id = person.deviceUserId ? person.deviceUserId : 100000;
        const month = person.recordTime.split(" ")[1];
        const day = person.recordTime.split(" ")[2];
        const year = person.recordTime.split(" ")[3];
        const time = person.recordTime.split(" ")[4];

        const query = `INSERT INTO device_attendances (user_id, year, month, day, time) VALUES (${user_id}, ${year}, '${month}', '${day}', '${time}')`;
        connection.query(query);
      });
    } else if (device_id == 2) {
      await zkInstance2.createSocket();

      const clearTableQuery = "truncate table device_attendances";
      connection.query(clearTableQuery);

      const attendance2 = await zkInstance2.getAttendances();
      attendance2.data.map((person) => {
        const user_id = person.deviceUserId ? person.deviceUserId : 100000;
        const month = person.recordTime.split(" ")[1];
        const day = person.recordTime.split(" ")[2];
        const year = person.recordTime.split(" ")[3];
        const time = person.recordTime.split(" ")[4];
        const query = `INSERT INTO device_attendances (user_id, year, month, day, time) VALUES (${user_id}, ${year}, '${month}', '${day}', '${time}')`;
        connection.query(query);
      });
    } else if (device_id == 3) {
      await zkInstance3.createSocket();
      const clearTableQuery = "truncate table device_attendances";
      connection.query(clearTableQuery);

      const attendance3 = await zkInstance3.getAttendances((percent, total) => {
        console.log(percent, total);
      });
      // console.log(attendance3.data)
      await attendance3.data.map((person, index) => {
        // console.log(index)
        const user_id = person.deviceUserId ? person.deviceUserId : 100000;
        const month = person.recordTime.split(" ")[1];
        const day = person.recordTime.split(" ")[2];
        const year = person.recordTime.split(" ")[3];
        const time = person.recordTime.split(" ")[4];

        const query = `INSERT INTO device_attendances (user_id, year, month, day, time) VALUES (${user_id}, ${year}, '${month}', '${day}', '${time}')`;
        connection.query(query);
      });
    } else if (device_id == 4) {
      await zkInstance4.createSocket();

      const clearTableQuery = "truncate table device_attendances";
      connection.query(clearTableQuery);

      const attendance4 = await zkInstance4.getAttendances();
      attendance4.data.map((person) => {
        // console.log(person);
        const user_id = person.deviceUserId;
        const month = person.recordTime.split(" ")[1];
        const day = person.recordTime.split(" ")[2];
        const year = person.recordTime.split(" ")[3];
        const time = person.recordTime.split(" ")[4];

        const query = `INSERT INTO device_attendances (user_id, year, month, day, time) VALUES (${user_id}, ${year}, '${month}', '${day}', '${time}')`;
        connection.query(query);
      });
    }
    res.status(201).send({ message: "Data inserted successfully!!!" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Please check the "Device status" first' });
  }
});

//////////////////////////////////////////        Get users Attendance        ///////////////////////////////////////////////////////////////
const getAttendanceFromOtherTable = asyncHandler(async (req, res) => {
  const query1 = "SELECT * FROM user_attendance1";
  console.log("test");
  connection.query(query1, (err, result) => {
    if (err) {
      res.status(404).send("Error occured");
    } else {
      result.map((person) => {
        const user_id = person.user_id;
        const month = person.date.split(" ")[1];
        const day = person.date.split(" ")[2];
        const year = person.date.split(" ")[3];
        const time = person.date.split(" ")[4];

        const query = `INSERT INTO user_attendance (user_id, year, month, day, time) VALUES (${user_id}, ${year}, '${month}', '${day}', '${time}')`;
        connection.query(query, (error, result) => {
          if (error) {
            res.status(400).json({ message: "Unsuccessful connection" });
          }
        });
      });
    }
    res.status(201).send("Well done");
  });
});

/////////////////////////////////////////         Clear attendance           ///////////////////////////////////////////////////

const clearAttendances = asyncHandler(async (req, res) => {
  const device_id = req.params.id;
  try {
    if (device_id == 1) {
      await zkInstance1.createSocket();
      console.log(await zkInstance1.getAttendanceSize());
    } else if (device_id == 2) {
      await zkInstance2.createSocket();
      console.log(await zkInstance2.getAttendanceSize());
    } else if (device_id == 3) {
      await zkInstance3.createSocket();
      console.log(await zkInstance3.getAttendanceSize());
    } else if (device_id == 4) {
      await zkInstance4.createSocket();
      console.log(await zkInstance4.getAttendanceSize());
    }
    res.status(201).json({ message: "Device is connected" });
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

/////////////////////////////////////////////     Status     /////////////////////////////////////////////////////////
const getAlldeveicesStatus = asyncHandler(async (req, res) => {
  try {
    await zkInstance1.createSocket();
    await zkInstance2.createSocket();
    await zkInstance3.createSocket();
    if (zkInstance1.getInfo()) {
      console.log(await zkInstance1.getInfo());
      device1 = true;
    }

    if (zkInstance2.getInfo()) {
      console.log(await zkInstance2.getInfo());
      device2 = true;
    }
    if (zkInstance3.getInfo()) {
      console.log(await zkInstance3.getInfo());
      device3 = true;
    }
    if (device1 && device2 && device3) {
      res.status(201).json({ message: "All devices connected" });
    } else {
      res.status(400).json({ message: `Devices is not connected` });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "All devices are not connected" });
  }
});

///////////////////////////////////////////  All Users  ///////////////////////////////////////////////////////////

const getUsersFromAllDevices = asyncHandler(async (req, res) => {
  let users_array = [];

  try {
    await zkInstance1.createSocket();
    await zkInstance2.createSocket();
    await zkInstance3.createSocket();
    await zkInstance4.createSocket();

    const device1 = await zkInstance1.getUsers();
    const device2 = await zkInstance2.getUsers();
    const device3 = await zkInstance3.getUsers();
    const device4 = await zkInstance4.getUsers();

    const clearQuery = "truncate table test_users";
    connection.query(clearQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Unknown error occured" });
      }
    });

    const addUsers = (data) => {
      data.map((person) => {
        const query = `INSERT INTO test_users (user_id, name ) VALUES (${person.userId} , '${person.name}')`;
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
        });
      });
    };

    addUsers(device1.data);
    addUsers(device2.data);
    addUsers(device3.data);
    addUsers(device4.data);

    res.status(201).json({ message: "Success" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "All devices are not connected" });
  }
});

///////////////////////////////////////////  All Attenddances  ///////////////////////////////////////////////////////////
const getAttendancesFromAllDevices = asyncHandler(async (req, res) => {
  try {
    await zkInstance1.createSocket();
    await zkInstance2.createSocket();
    await zkInstance3.createSocket();
    // await zkInstance4.createSocket();

    const device1 = await zkInstance1.getAttendances();
    const device2 = await zkInstance2.getAttendances();
    const device3 = await zkInstance3.getAttendances();

    // console.log(device1.data)

    const addAttendance = (data, table) => {
      const clearQuery = `truncate table ${table}`;
      connection.query(clearQuery);
      data.map((person) => {
        const user_id = person.deviceUserId ? person.deviceUserId : 100000;
        const month = person.recordTime.split(" ")[1];
        const day = person.recordTime.split(" ")[2];
        const year = person.recordTime.split(" ")[3];
        const time = person.recordTime.split(" ")[4];

        const query = `INSERT INTO ${table} (user_id, year, month, day, time) VALUES (${user_id}, ${year}, '${month}', '${day}', '${time}')`;
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      });
    };

    addAttendance(device1.data, 'device1');
    addAttendance(device2.data, 'device2');
    addAttendance(device3.data, 'device3');
    // res.status(201).json({ message: "Success" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Devices not connected" });
  }
  res.status(200).json({ message: "SUccess" });
});

///////////////////////////////////////////  All Logs  ///////////////////////////////////////////////////////////
const getCountAttendancesFromAllDevices = asyncHandler(async (req, res) => {
  try {
    await zkInstance1.createSocket();
    await zkInstance2.createSocket();
    await zkInstance3.createSocket();
    // await zkInstance4.createSocket();

    const device1 = await zkInstance1.getInfo();
    const device2 = await zkInstance2.getInfo();
    const device3 = await zkInstance3.getInfo();

    const clearQuery = "truncate table devices_logs";
    connection.query(clearQuery);

    const addLogs = (users, attendance) => {
      const query = `INSERT INTO devices_logs( users_count, attendance_count) VALUES (${users}, ${attendance})`;
      connection.query(query, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    };

    addLogs(device1.userCounts, device1.logCounts);
    addLogs(device2.userCounts, device2.logCounts);
    addLogs(device3.userCounts, device3.logCounts);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Devices not connected" });
  }
  res.status(201).json({ message: "Successfully data inserted" });
});
module.exports = {
  getUsers,
  getAttendance,
  getAttendanceFromOtherTable,
  clearAttendances,
  getDeviceStatus,
  getAlldeveicesStatus,
  getUsersFromAllDevices,
  getAttendancesFromAllDevices,
  getCountAttendancesFromAllDevices,
};
