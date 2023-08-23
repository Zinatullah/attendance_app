const asyncHandler = require("express-async-handler");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

//////////////////////////////////////////  Current report  /////////////////////////////////////////////////////
const current_report = asyncHandler(async (req, res) => {
  const { today, current_month, year } = req.body;

  const query = `CREATE or REPLACE VIEW current_report as 
    SELECT u.name, d.month, d.day, d.time  FROM device2_attendances as d, all_users as u WHERE day = ${today} and month = '${current_month}' and year = ${year} and d.user_id = u.user_id
    UNION
    SELECT u.name, d.month, d.day, d.time  FROM device2_attendances as d, all_users as u WHERE day = ${today} and month = '${current_month}' and year = ${year} and d.user_id = u.user_id
    UNION
    SELECT u.name, d.month, d.day, d.time  FROM device3_attendances as d, all_users as u WHERE day = ${today} and month = '${current_month}' and year = ${year} and d.user_id = u.user_id`;

  connection.query(query, (error, result) => {
    if (error) {
      res.status(400).json({ message: "Result not found!!!" });
    }
  });

  const daily_report_query = `select * from current_report`;
  connection.query(daily_report_query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Result not found!!!" });
    } else {
      res.status(200).json(result);
    }
  });
});

/////////////////////////////////////     Daily report    ////////////////////////////////////////////
const getDailyReport = asyncHandler(async (req, res) => {
  const { today, current_month, year } = req.body;
  const query = `select u.name, d.user_id, d.month, d.day, d.time from device1_attendances as d, all_users as u where day = ${today} and month = '${current_month}' and year = '${year}' and u.user_id = d.user_id
  UNION select uu.name, dd.user_id, dd.month, dd.day, dd.time from device2_attendances as dd, all_users as uu where day = ${today} and month = '${current_month}' and year = '${year}' 
  UNION select uuu.name, ddd.user_id, ddd.month, ddd.day, ddd.time from device3_attendances as ddd, all_users as uuu where day = ${today} and month = '${current_month}' and year = '${year}'
  `;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Result not found!!!" });
    }
  });

  const daily_report_query = `select * from dailyReport`;
  connection.query(daily_report_query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Result not found!!!" });
    } else {
      res.status(200).json(result);
    }
  });
});

////////////////////////////////////////////   Monthly report  ////////////////////////////////
const getMonthReport = asyncHandler(async (req, res) => {
  const { current_month, previous_month, year } = req.body;
  console.log(current_month, previous_month)

  const query = `create or replace view monthly_attendance as SELECT id, user_id, day, month, year, min(time) as entery_time, max(time) exit_time FROM device3_attendances where month = '${previous_month}' and day >= 15 and year = ${year} group by day, user_id HAVING count(day) >= 2  UNION  SELECT id, user_id, day, month, year, min(time) as entery_time, max(time) exit_time FROM device3_attendances where month = '${current_month}' and day < 15 and year = ${year} group by day, user_id HAVING count(day) >= 2`;
  connection.query(query, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Error occured" });
    }
  });

  const query_s = `SELECT name, month, monthly_attendance.user_id, count(day) as days, entery_time, exit_time FROM monthly_attendance, device3_users WHERE monthly_attendance.user_id = device3_users.user_id group by user_id order by day`;
  connection.query(query_s, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Unknow error occured" });
    }

    const hours_query = ` SELECT * FROM monthly_attendance order by day `;
    connection.query(hours_query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "Hours error occred" });
      } else {
        const truncate_query = "truncate table time_counter";
        connection.query(truncate_query);
        results.map((resultsssssss) => {
          let full_time_counter = 0;
          let half_time_counter = 0;
          let hours = resultsssssss.entery_time.split(":")[0];
          let minutes = resultsssssss.entery_time.split(":")[1];
          let seconds = resultsssssss.entery_time.split(":")[2];
          let total_time =
            parseInt(hours * 3600) + parseInt(minutes * 60) + parseInt(seconds);
          let max_time = 29759;
          total_time = total_time < max_time;

          switch (total_time) {
            case true:
              full_time_counter++;
              break;
            case false:
              half_time_counter++;
              break;

            default:
              break;
          }

          const time_query = `INSERT INTO time_counter (user_id, full_time_counter, half_time_counter) VALUES (${resultsssssss.user_id}, ${full_time_counter}, ${half_time_counter})`;
          connection.query(time_query, (error, resultsss) => {
            if (error) {
              console.log(error);
              res.status(400).json({ message: "Time error occured" });
            } else {
            }
          });
        });
      }
    });

    const time_counter_view = `create or replace view monthly_time_counter as SELECT *, sum(full_time_counter) as full_time, sum(half_time_counter) as half_time FROM time_counter group by user_id`;
    connection.query(time_counter_view, (error, grand_result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "check the views" });
      } else {
      }
    });

    const querys = `SELECT name, month, monthly_attendance.user_id, count(day) as days, full_time, half_time FROM monthly_attendance, all_users, monthly_time_counter WHERE monthly_attendance.user_id = all_users.user_id and monthly_attendance.user_id = monthly_time_counter.user_id group by user_id order by day`;
    connection.query(querys, (error, final_result) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          message:
            "The error occured between monthly_report table and time_counter tables",
        });
      } else {
        res.status(201).json(final_result);
      }
    });
  });
});
module.exports = {
  current_report,
  getDailyReport,
  getMonthReport,
};
