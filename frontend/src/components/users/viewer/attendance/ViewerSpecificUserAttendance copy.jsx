import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { DigitConvertor } from "persian-digit-tools";
import LeaveFrom from "./LeaveFrom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import NewTable from "./NewTable";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getsingleuserattendance,
  getsingleuser,
  vacation,
} from "../../../../features/attendance/attendanceSlice";
import {
  getUsers,
  getAttendance,
} from "../../../../features/devices/devicesSlice";
import { logout, reset } from "../../../../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
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
import VacationTable from "./VacationTable";
const persianDate = require("persian-date");

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
  const [employee, setEmployee] = useState();
  const [month, setMonth] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [previousVacation, setPreviousVacation] = useState();

  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const { user } = useSelector((state) => state.auth);

  const dateChanger = (value) => {
    let mon = new Date(value).toLocaleString("fa-Af", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return mon.split(" ")[1];
  };

  const hamal = dateChanger("Mar 21 2023");
  const sawar = dateChanger(`Apr 21 2023`);
  const jawza = dateChanger(`May 21 2023`);
  const saratan = dateChanger(`Jun 21 2023`);
  const asad = dateChanger(`Jul 21 2023`);
  const sanbola = dateChanger(`Aug 21 2023`);
  const mezan = dateChanger(`Sep 21 2023`);
  const aqrab = dateChanger(`Oct 21 2023`);
  const qaws = dateChanger(`Nov 21 2023`);
  const jadi = dateChanger(`Dec 21 2023`);
  const dalwa = dateChanger(`Jan 21 2023`);
  const hoot = dateChanger(`Feb 21 2023`);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleSubmit = async () => {
      const data = await dispatch(getsingleuserattendance(userId));
      const username = await dispatch(getsingleuser(userId));
      setUsername(username.payload);
      setEmployee(data.payload);
    };
    handleSubmit();
  }, [userId, month, dispatch]);

  let arr = [];
  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleVacation = async () => {
    const months = p2e(month);
    const check_vacation = { userId, months };
    const get_vacation = await dispatch(vacation(check_vacation));
    setPreviousVacation(get_vacation.payload);
  };

  const handleClickOpens = () => {
    setOpens(true);
    const handleVacation = async () => {
      const months = p2e(month);
      const check_vacation = { userId, months };
      const get_vacation = await dispatch(vacation(check_vacation));
      setPreviousVacation(get_vacation.payload);
    };
    handleVacation();
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const e2a = (s) => s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

  const p2a = (s) =>
    s.replace(/[۰-۹]/g, (d) => "٠١٢٣٤٥٦٧٨٩"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
  const a2p = (s) =>
    s.replace(/[٠-٩]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);

  const handleClose = () => {
    setOpen(false);
  };

  let generateMonth;
  let hijriDate;
  let x;
  let y;

  return (
    <>
      <nav
        className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        style={{ height: "100px" }}
      >
        <Navbar />
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-20 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/viewerDashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/viewusers"
                className="flex bg-gray-200  items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Employees Attendance
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/ViewerDevices"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Device</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  <button onClick={handleLogout}>Logout</button>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 mt-10">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="w-full text-white relative">
            <form>
              <Grid container spacing={3}>
                {/* <Grid item xs={1}></Grid> */}
                <Grid item xs={6}>
                  <select
                    value={month}
                    onChange={handleChange}
                    className="border-gray-700 border-dashed rounded-lg bg-purple-900"
                    style={{
                      marginLeft: "50px",
                      marginRight: "50px",
                      width: "300px",
                    }}
                  >
                    <option className="text-right pr-12" value="">
                      میاشت انتخاب کړئ
                    </option>
                    <option className="text-right" value="۱">
                      {hamal}
                    </option>
                    <option className="text-right" value="۲">
                      {sawar}
                    </option>
                    <option className="text-right" value="۳">
                      {jawza}
                    </option>
                    <option className="text-right" value="۴">
                      {saratan}
                    </option>
                    <option className="text-right" value="۵">
                      {asad}
                    </option>
                    <option className="text-right" value="۶">
                      {sanbola}
                    </option>
                    <option className="text-right" value="۷">
                      {mezan}
                    </option>
                    <option className="text-right" value="۸">
                      {aqrab}
                    </option>
                    <option className="text-right" value="۹">
                      {qaws}
                    </option>
                    <option className="text-right" value="۱۰">
                      {jadi}
                    </option>
                    <option className="text-right" value="۱۱">
                      {dalwa}
                    </option>
                    <option className="text-right" value="۱۲">
                      {hoot}
                    </option>
                  </select>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    onClick={handleClickOpens}
                    color="secondary"
                  >
                    <svg
                      className="w-4 h-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 19H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v4M6 1v4a1 1 0 0 1-1 1H1m11 8h4m-2 2v-4m5 2a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                      />
                    </svg>
                    <span className="pl-4">Check vacation</span>
                  </Button>
                </Grid>

                <Grid item xs={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleClickOpen}
                    color="info"
                  >
                    <svg
                      className="w-4 h-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 19H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v4M6 1v4a1 1 0 0 1-1 1H1m11 8h4m-2 2v-4m5 2a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                      />
                    </svg>
                    <span className="pl-4">Vacation form</span>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
          {employee ? (
            employee.map((element, index) => (
              <span key={index} className="hidden">
                {
                  (generateMonth = new Date(
                    `'${element.month} ${element.day} ${element.year} '`
                  ).toLocaleDateString("ar-SA", {
                    day: "numeric",
                    month: "narrow",
                    year: "numeric",
                    nu: "narrow",
                  }))
                }
                {(y = p2e(month))}

                {(x = a2e(generateMonth.split(" ")[1]))}
                {x == y ? arr.push(element) : ""}
              </span>
            ))
          ) : (
            <span></span>
          )}

          <TableContainer component={Paper} className="mt-5">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell scope="row">No</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Year</StyledTableCell>
                  <StyledTableCell>Month</StyledTableCell>
                  <StyledTableCell>Day</StyledTableCell>
                  <StyledTableCell>In</StyledTableCell>
                  <StyledTableCell>Out</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arr ? (
                  arr.map((row, index) => (
                    <React.Fragment key={index}>
                      <StyledTableRow
                        style={{ display: "none" }}
                      ></StyledTableRow>

                      <StyledTableRow
                        key={index}
                        className={
                          row.entry_time.split(":")[0] * 3600 +
                            row.entry_time.split(":")[1] * 60 +
                            row.entry_time.split(":")[2] >
                          "29700"
                            ? "bg-red-300"
                            : ""
                        }
                      >
                        <StyledTableCell component="th" scope="row">
                          {DigitConvertor.toPersian(`${index + 1}`)}
                        </StyledTableCell>
                        <StyledTableCell>{username[0].name}</StyledTableCell>
                        <StyledTableCell style={{ display: "none" }}>
                          {
                            (hijriDate = new Date(
                              `'${row.month} ${row.day} ${row.year}'`
                            ).toLocaleString("fa-Af", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              nu: "latn",
                            }))
                          }
                        </StyledTableCell>
                        <StyledTableCell>
                          {hijriDate.split(" ").length === 5
                            ? hijriDate.split(" ")[3]
                            : hijriDate.split(" ")[2]}
                        </StyledTableCell>
                        <StyledTableCell>
                          {hijriDate.split(" ").length === 5
                            ? hijriDate.split(" ")[1] +
                              " " +
                              hijriDate.split(" ")[2]
                            : hijriDate.split(" ")[1]}
                          {/* {hijriDate.split(" ")[1]} */}
                        </StyledTableCell>
                        <StyledTableCell>
                          {hijriDate.split(" ")[0]}
                        </StyledTableCell>
                        <StyledTableCell>
                          {DigitConvertor.toPersian(row.entry_time)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {DigitConvertor.toPersian(row.exit_time)}
                        </StyledTableCell>
                      </StyledTableRow>
                    </React.Fragment>
                  ))
                ) : (
                  <tr className="bg-gray-100  border-b text-sm text-black-600">
                    <td>No Attendance</td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <React.Fragment>
        <Dialog fullWidth open={open} maxWidth="md" onClose={handleClose}>
          <DialogTitle className="text-center bg-teal-700 text-white">
            Vacation form
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
              <LeaveFrom username={username} handleClose={handleClose} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog fullScreen open={opens} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative", background: "lightgray" }}>
            <Toolbar>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                variant="h6"
                component="div"
                color="black"
                onClick={handleCloses}
                className="cursor-pointer"
              >
                Close
              </Typography>
              <IconButton
                edge="start"
                color="black"
                onClick={handleCloses}
                aria-label="close"
                className="cursor-pointer"
              >
                <CloseIcon className="cursor-pointer" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <VacationTable
            month={month}
            vacation={previousVacation}
            username={username ? username[0].name : ""}
            handleVacation={handleVacation}
          />
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default SpecificUserAttendance;
