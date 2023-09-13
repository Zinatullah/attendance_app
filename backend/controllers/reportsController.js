const asyncHandler = require("express-async-handler");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});

///////////////////////////////// Firdays ///////////////////////////////

const getFriday = (year, month) => {
  let fridays = [];
  let final_result = [];
  let month_couner = "";
  if (month == 1) {
    month_couner = 31;
  } else if (month == 2) {
    month_couner = 28;
  } else if (month == 3) {
    month_couner = 31;
  } else if (month == 4) {
    month_couner = 30;
  } else if (month == 5) {
    month_couner = 31;
  } else if (month == 6) {
    month_couner = 30;
  } else if (month == 7) {
    month_couner = 31;
  } else if (month == 8) {
    month_couner = 31;
  } else if (month == 9) {
    month_couner = 30;
  } else if (month == 10) {
    month_couner = 31;
  } else if (month == 11) {
    month_couner = 30;
  } else if (month == 12) {
    month_couner = 31;
  }

  for (let index = 1; index < month_couner; index++) {
    let cc = new Date(`${year}/${month}/${index}`).toDateString("en-us");
    fridays.push(cc);
  }
  fridays.map((element) => {
    if (element.split(" ")[0] === "Fri") {
      final_result.push(element);
    }
  });
  final_result.map((element) => {
    let year_month = element.split(" ")[1];
    let year_days = element.split(" ")[2];
    let year_year = element.split(" ")[3];

    let dd = new Date(`${year_days}/${year_month}/${year_year}`);
    dd = dd.toLocaleDateString("Fa-Af", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let persian_day = dd.split(" ")[0];
    let persian_month = dd.split(" ")[1];
    let persian_year = dd.split(" ")[2];

    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    persian_day = p2e(persian_day);
    persian_year = p2e(persian_year);

    const query = `INSERT INTO fridays(name, day, month, year) VALUES ('جمعه', '${persian_day}', '${persian_month}', '${persian_year}')`;
    connection.query(query, (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  });

  return final_result;
};

const persian_date = (year) => {
  for (let index = 1; index < 13; index++) {
    getFriday(year, index);
  }
};

////////////////////////////////////////////   two months fridays  ////////////////////////////////
const getFridays = asyncHandler(async (req, res) => {
  const clearQuery = "truncate table fridays";
  connection.query(clearQuery, (error) => {
    if (error) {
      console.log(error);
    }
  });

  let year = new Date().toDateString("En-US", { year: "long" });
  year = year.split(" ")[3];
  persian_date(year);

  const { current_month, previous_month } = req.body;
  const query = `create or REPLACE view month_fridays as SELECT COUNT(*) as fridays 
  FROM (
      SELECT * 
      FROM fridays 
      WHERE day <= 15 AND month = '${current_month}'
      UNION  
      SELECT * 
      FROM fridays 
      WHERE day >= 15 AND month = '${previous_month}'
  ) AS refined_query;`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "تېروتنه ترسره شوه" });
    } else {
      res.status(201).json({ message: "کړنه ترسره شوه" });
    }
  });
});

////////////////////////////////////////////   Single friday  ////////////////////////////////
const get_Friday = asyncHandler(async (req, res) => {
  const { month } = req.body;
  const clearQuery = "truncate table fridays";
  connection.query(clearQuery, (error) => {
    if (error) {
      console.log(error);
    }
  });
  let year = new Date().toDateString("En-US", { year: "long" });
  year = year.split(" ")[3];
  persian_date(year);

  const query = `select * from fridays where month = '${month}'`;
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "هېڅ جمعه پیدا نشوه" });
    } else {
      res.status(201).json(result);
    }
  });
});

//////////////////////////////////////////  Current report  /////////////////////////////////////////////////////
const current_report = asyncHandler(async (req, res) => {
  const { today, current_month, year } = req.body;

  const query = `CREATE or REPLACE VIEW current_report as 
    SELECT u.name, d.month, d.day, d.time  FROM device1_attendances as d, all_users as u WHERE day = ${today} and month = '${current_month}' and year = ${year} and d.user_id = u.user_id group by d.user_id
    UNION
    SELECT u.name, d.month, d.day, d.time  FROM device2_attendances as d, all_users as u WHERE day = ${today} and month = '${current_month}' and year = ${year} and d.user_id = u.user_id group by d.user_id
    UNION
    SELECT u.name, d.month, d.day, d.time  FROM device3_attendances as d, all_users as u WHERE day = ${today} and month = '${current_month}' and year = ${year} and d.user_id = u.user_id group by d.user_id`;

    // console.log(grandQuery)
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
  const query = `create or replace view dailyReport as  
  select uuu.name, ddd.user_id, ddd.month, ddd.day, min(time) as entry_time, max(time) as exit_time from device1_attendances as ddd, all_users as uuu where day = ${today ? today : 1} and month = '${current_month}' and year = '${year}' and uuu.user_id = ddd.user_id group by day, user_id HAVING count(day) >= 2
  UNION
  select uuu.name, ddd.user_id, ddd.month, ddd.day, min(time) as entry_time, max(time) as exit_time from device2_attendances as ddd, all_users as uuu where day = ${today ? today : 1} and month = '${current_month}' and year = '${year}' and uuu.user_id = ddd.user_id group by day, user_id HAVING count(day) >= 2
  UNION  
  select uuu.name, ddd.user_id, ddd.month, ddd.day, min(time) as entry_time, max(time) as exit_time from device3_attendances as ddd, all_users as uuu where day = ${today ? today : 1} and month = '${current_month}' and year = '${year}' and uuu.user_id = ddd.user_id group by day, user_id HAVING count(day) >= 2
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

////////////////////////////////////////////   Single month  ////////////////////////////////
const getMonthReport = asyncHandler(async (req, res) => {
  const { current_month, previous_month, year } = req.body;

  console.log(current_month, previous_month, "From here")

  const query = `create or replace view monthly_attendance as SELECT id, name, user_id, year, month, day, entery_time, exit_time FROM all_attendances where month = '${previous_month}' and day >= 15 and year = ${year} group by day, user_id HAVING count(day) >= 2  UNION select id, name, user_id, year, month, day, entery_time, exit_time FROM all_attendances where month = '${current_month}' and day < 15 and year = ${year} group by day, user_id HAVING count(day) >= 2`;

  
  connection.query(query, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Error occured" });
    }
  });

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

  const querys = `create or replace view regular_days as SELECT users.name, attendance.month, attendance.user_id, count(attendance.day) as days, counter.full_time, counter.half_time FROM monthly_attendance as attendance, all_users as users, monthly_time_counter as counter WHERE attendance.user_id = users.user_id and attendance.user_id = counter.user_id group by  attendance.user_id order by user_id,day
    `;
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

////////////////////////////////////////////   Two month report  ////////////////////////////////
const getTwoMonths = asyncHandler(async (req, res) => {
  const { current_month, previous_month, year } = req.body;

  const query = `create or replace view monthly_attendance as SELECT id, name, user_id, year, month, day, entery_time, exit_time FROM all_attendances where month = '${previous_month}' and day >= 15 and year = ${year} group by day, user_id  UNION select id, name, user_id, year, month, day, entery_time, exit_time FROM all_attendances where month = '${current_month}' and day < 15 and year = ${year} group by day, user_id`;

  connection.query(query, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Error occured" });
    }
  });

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

  const querys = `create or replace view regular_days as SELECT users.name, attendance.month, attendance.user_id, count(attendance.day) as days, counter.full_time, counter.half_time FROM monthly_attendance as attendance, all_users as users, monthly_time_counter as counter WHERE attendance.user_id = users.user_id and attendance.user_id = counter.user_id group by  attendance.user_id order by user_id,day
    `;
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


////////////////////////////////////////////   Two month report  ////////////////////////////////
const grandReport = asyncHandler(async (req, res) => {
  const query = `create or replace view total as select * from regular_days, general_vacation, month_fridays`;
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
    }
  });

  // const grandQuery =
    // "create or replace view final_report as SELECT t.name, t.month, t.user_id, t.days, t.full_time, t.half_time, t.generalLeaveDays, t.fridays, person_vacation.leave_type, person_vacation.vacation_days from total as t left join person_vacation on t.user_id = person_vacation.user_id";


    const newQuery = "create or replace view final_report as SELECT t.name, t.month, t.user_id, t.days, t.full_time, t.half_time, t.generalLeaveDays, t.fridays, SUM(person_vacation.vacation_days) AS total_leave_days, GROUP_CONCAT(COALESCE(CONCAT(person_vacation.leave_type, ' : ', vacation_days))) AS leave_types FROM total AS t LEFT JOIN person_vacation ON t.user_id = person_vacation.user_id GROUP BY t.name, t.month, t.user_id, t.days, t.full_time, t.half_time, t.generalLeaveDays, t.fridays order by user_id"

    
  connection.query(newQuery, (error, result) => {
    if (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "په عمومي راپور کې مشکل رامنځته شوی دی" });
    }
  });

  const finalQuery = "select * from final_report";
  connection.query(finalQuery, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "په آخری راپور کې مشکل رامنځته شوی دی" });
    } else {
      res.status(201).json(result);
    }
  });
});

module.exports = {
  current_report,
  getDailyReport,
  getMonthReport,
  getTwoMonths,
  getFridays,
  get_Friday,
  grandReport,
};
