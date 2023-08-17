const asyncHandler = require("express-async-handler");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

//////////////////////////////////////////////////////// Monthly report  /////////////////////////////////////////////////////
const getDailyReport = asyncHandler(async (req, res) => {
  const { today, current_month, year } = req.body;
  const query = `create or replace view dailyReport as select * from device3_attendances where day = '${today}' and month = '${current_month}' and year = '${year}' `
  connection.query(query, (error, result)=>{
    if(error){
      console.log(error)
      res.status(400).json({message: "Result not found!!!"})
    }
  })

  const daily_report_query = `SELECT device3_users.name, dailyreport.user_id, dailyreport.day, dailyreport.month, dailyreport.year, dailyreport.time FROM dailyreport, device3_users where dailyreport.user_id = device3_users.user_id`
  connection.query(daily_report_query, (error, result)=>{
    if(error){
      console.log(error)
      res.status(400).json({message: "Result not found!!!"})
    }else {
      res.status(200).json(result)
    }
  })

  res.status(200);
});

//////////////////////////////////////////////////////// Monthly report  /////////////////////////////////////////////////////
const getMonthReport = asyncHandler(async (req, res) => {
  const { current_month, previous_month, year } = req.body;

  //////////////////////////////////////////////////////// Monthly_report_View  /////////////////////////////////////////////////////
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
              console.log("UNKNOW");
              break;
          }

          console.log(half_time_counter);
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

    const querys = `SELECT name, month, monthly_attendance.user_id, count(day) as days, full_time, half_time FROM monthly_attendance, device3_users, monthly_time_counter WHERE monthly_attendance.user_id = device3_users.user_id and monthly_attendance.user_id = monthly_time_counter.user_id group by user_id order by day`;
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
  getDailyReport,
  getMonthReport,
};
