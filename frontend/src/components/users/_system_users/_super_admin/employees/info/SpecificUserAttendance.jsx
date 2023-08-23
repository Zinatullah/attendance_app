import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { removeVacation } from "../../../../../../features/attendance/attendanceSlice";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getsingleuserattendance,
  getsingleuser,
  vacation,
} from "../../../../../../features/attendance/attendanceSlice";
import { logout, reset } from "../../../../../../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import VacationTable from "./../leaves/VacationTable";
import { current } from "@reduxjs/toolkit";
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

  let days = "";
  const handleChange = (event) => {
    setMonth(event.target.value);
    setShow("");
  };

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

  employee.map((person) => {
    days[person.day - 1] = person;
  });

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

  let texts = "";
  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="w-full text-white relative">
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <select
                  value={month}
                  onChange={handleChange}
                  className="border-gray-700 border-dashed rounded-lg bg-purple-900 text-xl"
                  style={{
                    marginLeft: "50px",
                    marginRight: "50px",
                    width: "80%",
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
          <TableContainer component={Paper} className="mt-5" dir="rtl">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell scope="row">نمبر</StyledTableCell>
                  <StyledTableCell>نوم</StyledTableCell>
                  <StyledTableCell>کال</StyledTableCell>
                  <StyledTableCell>میاشت</StyledTableCell>
                  <StyledTableCell>ورځ</StyledTableCell>
                  <StyledTableCell>داخېلېدل</StyledTableCell>
                  <StyledTableCell>وتل</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {days ? (
                  days.map((row, index) => (
                    <React.Fragment key={index}>
                      <StyledTableRow sx={{ display: "none" }}></StyledTableRow>
                      <StyledTableRow
                        key={index}
                        className={
                          row.entery_time
                            ? row.entery_time.split(":")[0] * 3600 +
                                row.entery_time.split(":")[1] * 60 +
                                row.entery_time.split(":")[2] >
                              "29700"
                              ? "bg-red-300"
                              : ""
                            : ""
                        }
                      >
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.year}</StyledTableCell>
                        <StyledTableCell>{row.month}</StyledTableCell>
                        <StyledTableCell>{row.day}</StyledTableCell>
                        <StyledTableCell>{row.entery_time}</StyledTableCell>
                        <StyledTableCell>{row.exit_time}</StyledTableCell>
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
                <StyledTableCell scope="row">نمبر</StyledTableCell>
                <StyledTableCell>د رخصتی ډول</StyledTableCell>
                <StyledTableCell>د شروع وخت</StyledTableCell>
                <StyledTableCell>ختمېدل</StyledTableCell>
                <StyledTableCell>میاشت</StyledTableCell>
                <StyledTableCell>ورځې</StyledTableCell>
                <StyledTableCell>
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
                    <StyledTableCell>
                      {(element.leave_type == 1 ? "حج" : "") ||
                        (element.leave_type == 2 ? "تفریحي" : "") ||
                        (element.leave_type == 3 ? "مریضی ولادی" : "") ||
                        (element.leave_type == 4 ? "کسر معاش" : "") ||
                        (element.leave_type == 5 ? "ضرورت" : "") ||
                        (element.leave_type == 6 ? "کسر معاش" : "") ||
                        (element.leave_type == 7 ? "خدمتی" : "")}
                    </StyledTableCell>
                    <StyledTableCell>{element.start_date}</StyledTableCell>
                    <StyledTableCell>{element.end_date}</StyledTableCell>
                    <StyledTableCell>{element.month}</StyledTableCell>
                    <StyledTableCell>
                      {element.end_date - element.start_date}
                    </StyledTableCell>
                    <StyledTableCell className="w-60 text-right">
                      {element.info}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="outlined"
                        onClick={() => {
                          handleClickOpen(element);
                          setUser(element);
                        }}
                        color="secondary"
                      >
                        تغیرول
                      </Button>
                      <Button
                        variant="outlined"
                        color="warning"
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
