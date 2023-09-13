/* eslint-disable */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import DownloadIcon from "@mui/icons-material/Download";
const XLSX = require("xlsx");

import {
  getsingleuserattendance,
  getsingleuser,
  vacation,
  removeVacation,
} from "../../../../../../features/attendance/attendanceSlice";
import { getFriday } from "./../../../../../../features/report/reportSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import EditLeaveForm from "./../leaves/EditLeaveForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SpecificUserAttendance = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [month, setMonth] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = React.useState(false);
  const [previousVacation, setPreviousVacation] = useState();
  const [userr, setUser] = useState("");
  const [count, setCount] = useState();
  const [show, setShow] = useState("none");
  const [fridays, setFridays] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const userId = location.pathname.split("/")[2];

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const hijri_date = new Date().toLocaleDateString("FA-AF", {
    year: "numeric",
    month: "long",
    day: "numeric",
    nu: "ps",
  });

  let current_month = hijri_date.split(" ")[1];

  let days = [];

  let days_1 = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  let days_2 = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];

  let days_3 = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
  ];

  {
    if (month == "حمل") {
      days = days_1;
    } else if (month == "ثور") {
      days = days_1;
    } else if (month == "جوزا") {
      days = days_1;
    } else if (month == "سرطان") {
      days = days_1;
    } else if (month == "اسد") {
      days = days_1;
    } else if (month == "سنبله") {
      days = days_1;
    } else if (month == "میزان") {
      days = days_2;
    } else if (month == "عقرب") {
      days = days_2;
    } else if (month == "قوس") {
      days = days_2;
    } else if (month == "جدی") {
      days = days_2;
    } else if (month == "دلو") {
      days = days_2;
    } else if (month == "حوت") {
      days = days_3;
    }
  }

  const handleChange = (event) => {
    setMonth(event.target.value);
    setShow("");
  };

  const handleSubmit = async () => {
    const userData = {
      id: userId,
      month: month ? month : current_month,
    };
    const data = await dispatch(getsingleuserattendance(userData));
    setEmployee(data.payload);
    const username = await dispatch(getsingleuser(userId));
    setUsername(username.payload);
    const get_vacation = await dispatch(vacation(userData));
    setPreviousVacation(get_vacation.payload);
    const get_friday = await dispatch(getFriday(userData));
    setFridays(get_friday.payload);
  };

  useEffect(() => {
    handleSubmit();
  }, [userId, month, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleVacation = async () => {
    const userData = {
      id: userId,
      month: month ? month : current_month,
    };
    const get_vacation = await dispatch(vacation(userData));
    setPreviousVacation(get_vacation.payload);
  };

  const handleClose = () => {
    handleVacation();
    setOpen(false);
  };

  const handleClickRemove = async (e) => {
    const id = e.id;
    dispatch(removeVacation({ id }));
    setCount(previousVacation ? previousVacation.length : 0);
  };

  useEffect(() => {
    handleSubmit();
  }, [open, count]);

  if (employee) {
    employee
      ? employee.map((person) => {
          days[person.day - 1] = person;
        })
      : "";
  }

  if (fridays) {
    fridays.map((friday) => {
      days[friday.day - 1] = friday;
    });
  }

  const handleDownload = () => {
    download_file();
  };

  let Download_File_array = [];

  days.map((element) => {
    let before_time = element.entery_time ? element.entery_time : "";
    before_time = before_time.split(":")[0];

    let after_time = element.exit_time ? element.exit_time : "";
    after_time = after_time.split(":")[0];

    if (before_time < 12 && after_time > 12) {
      const { timestamp, ...modifiedObject } = element;

      element = modifiedObject;
      const arrangedObject = {
        day: element.day,
        id: element.id,
        name: element.name,
        year: element.year,
        month: element.month,
        entery_time: element.entery_time,
        exit_time: element.exit_time,
      };
      Download_File_array.push(arrangedObject);
    }
  });

  const download_file = async () => {
    const worksheet = await XLSX.utils.json_to_sheet(Download_File_array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["ورځ", "آیډي", "نوم", "کال", "میاشت", "داخلېدل", "وتل"]],
      {
        origin: "A1",
      }
    );

    const max_width = employee.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet["!cols"] = [{ wch: max_width }];

    const file_name = `${month}.xlsx`;
    XLSX.writeFile(workbook, file_name, { compression: true });
  };

  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="w-full text-white relative">
          <form>
            <Grid container spacing={3}>
              <Grid item xs={2} sx={{ marginLeft: "20px" }}>
                <div className="relative mt-1 mb-2 rounded-md shadow-sm flex flex-end text-xl">
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={handleDownload}
                  >
                    اکسل فایل
                    <DownloadIcon sx={{ marginRight: "10px" }} />
                  </Button>
                </div>
              </Grid>
              <Grid item xs={8}>
                <select
                  value={month}
                  onChange={handleChange}
                  className="border-gray-700 border-dashed rounded-lg bg-purple-900 text-xl"
                  style={{
                    marginLeft: "50px",
                    marginRight: "50px",
                    width: "90%",
                  }}
                >
                  <option className="text-right pr-12" value="" disabled>
                    میاشت انتخاب کړئ
                  </option>
                  <option className="text-right" value="حمل">
                    حمل
                  </option>
                  <option className="text-right" value="ثور">
                    ثور
                  </option>
                  <option className="text-right" value="جوزا">
                    جوزا
                  </option>
                  <option className="text-right" value="سرطان">
                    سرطان
                  </option>
                  <option className="text-right" value="اسد">
                    اسد
                  </option>
                  <option className="text-right" value="سنبله">
                    سنبله
                  </option>
                  <option className="text-right" value="میزان">
                    میزان
                  </option>
                  <option className="text-right" value="عقرب">
                    عقرب
                  </option>
                  <option className="text-right" value="قوس">
                    قوس
                  </option>
                  <option className="text-right" value="جدی">
                    جدی
                  </option>
                  <option className="text-right" value="دلو">
                    دلو
                  </option>
                  <option className="text-right" value="حوت">
                    حوت
                  </option>
                </select>
              </Grid>
            </Grid>
          </form>
        </div>

        <div style={{ display: show }}>
          <TableContainer
            component={Paper}
            className="mt-5"
            dir="rtl"
            sx={{ textAlign: "right" }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textAlign: "right" }} scope="row">
                    ورځ
                  </StyledTableCell>
                  <StyledTableCell sx={{ textAlign: "right" }}>
                    نوم
                  </StyledTableCell>
                  <StyledTableCell sx={{ textAlign: "right" }}>
                    کال
                  </StyledTableCell>
                  <StyledTableCell sx={{ textAlign: "right" }}>
                    میاشت
                  </StyledTableCell>
                  <StyledTableCell sx={{ textAlign: "right" }}>
                    داخېلېدل
                  </StyledTableCell>
                  <StyledTableCell sx={{ textAlign: "right" }}>
                    وتل
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody dir="rtl" className="text-right">
                {days ? (
                  days.map((row, index) => (
                    <React.Fragment key={index}>
                      <StyledTableRow sx={{ display: "none" }}></StyledTableRow>
                      <StyledTableRow
                        key={index}
                        className={
                          row.name == "جمعه"
                            ? "bg-blue-400"
                            : "" || row.entery_time
                            ? row.entery_time.split(":")[0] * 3600 +
                                row.entery_time.split(":")[1] * 60 +
                                row.entery_time.split(":")[2] >
                              "29700"
                              ? "bg-red-300"
                              : ""
                            : ""
                        }
                      >
                        <StyledTableCell sx={{ textAlign: "right" }}>
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ textAlign: "right" }}
                          className="text-right"
                        >
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "right" }}>
                          {row.year}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "right" }}>
                          {row.month}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "right" }}>
                          {row.entery_time}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "right" }}>
                          {row.exit_time}
                        </StyledTableCell>
                      </StyledTableRow>
                    </React.Fragment>
                  ))
                ) : (
                  <StyledTableRow></StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div
        style={{ display: show }}
        className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-1"
      >
        <h1 className="text-center text-black mb-5">ددې میاشتې رخصتي</h1>

        <TableContainer component={Paper} dir="rtl">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ textAlign: "center" }} scope="row">
                  نمبر
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  د رخصتی ډول
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  د شروع وخت
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  ختمېدل
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  ورځې
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  میاشت
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;معلومات
                </StyledTableCell>
                <StyledTableCell>نور معلومات</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previousVacation ? (
                previousVacation.map((element, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{element.leave_type}</StyledTableCell>
                    <StyledTableCell>{element.start_date}</StyledTableCell>
                    <StyledTableCell>{element.end_date}</StyledTableCell>
                    <StyledTableCell>
                      {element.end_date - element.start_date}
                    </StyledTableCell>
                    <StyledTableCell>{element.month}</StyledTableCell>
                    <StyledTableCell className="w-60 text-right">
                      {element.info}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="contained"
                        onClick={() => {
                          handleClickOpen(element);
                          setUser(element);
                        }}
                        color="success"
                      >
                        تغیرول
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          handleClickRemove(element);
                        }}
                      >
                        لمنځه وړل
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell>
                    په دې میاشت کې هېڅ رخصتي شتون نلري
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <React.Fragment>
        <Dialog fullWidth open={open} maxWidth="md" onClose={handleClose}>
          <DialogTitle className="text-center bg-teal-700 text-white">
            د رخصتی تغیرولو فورم
          </DialogTitle>
          <DialogContent>
            <Box
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
                width: "fit-content",
              }}
            >
              <EditLeaveForm
                user={userr}
                handleClose={handleClose}
                handleVacation={handleVacation}
                name={username ? username[0].name : ""}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>بندول</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default SpecificUserAttendance;
