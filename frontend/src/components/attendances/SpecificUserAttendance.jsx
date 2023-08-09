import { DigitConvertor } from "persian-digit-tools";
import {
  getsingleuserattendance,
  getsingleuser,
} from "../../features/attendance/attendanceSlice";
import { getUsers, getAttendance } from "../../features/devices/devicesSlice";
import { logout, reset } from "../../features/auth/authSlice";
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
const persianDate = require("persian-date");

const newPersianDate = new persianDate().format();

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

  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const { user } = useSelector((state) => state.auth);

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

  var colorPicker = "";
  const validTime = 2970000;
  var pickedTime = "";
  var str1;

  var totalSeconds1;
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

  let generateMonth;
  let hijriDate;
  let x;
  let y;
  let hours;
  let minutes;
  let seconds;
  return (
    <>
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700" style={{height: '100px'}}>
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
                  xmlns="http://www.w3.org/2000/svg"
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
                className="flex bg-gray-200 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
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
                to="/devices"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
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
                to=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
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
          <div className="w-full text-gray-500">
            <form>
              <select
                value={month}
                onChange={handleChange}
                className="w-auto ml-15 bg-gray-200"
                style={{ width: "400px", marginLeft: "150px" }}
              >
                <option className="text-right" disabled value="">
                  میاشت انتخاب کړئ
                </option>
                <option className="text-right" value="۱">
                  محرم
                </option>
                <option className="text-right" value="۲">
                  صفر
                </option>
                <option className="text-right" value="۳">
                  ربيع الأول
                </option>
                <option className="text-right" value="۴">
                  ربيع الآخر
                </option>
                <option className="text-right" value="۵">
                  جمادى الأولى
                </option>
                <option className="text-right" value="۶">
                  جمادى الآخرة
                </option>
                <option className="text-right" value="۷">
                  رجب
                </option>
                <option className="text-right" value="۸">
                  شعبان
                </option>
                <option className="text-right" value="۹">
                  رمضان
                </option>
                <option className="text-right" value="۱۰">
                  شوال
                </option>
                <option className="text-right" value="۱۱">
                  ذو القعدة
                </option>
                <option className="text-right" value="۱۲">
                  ذو الحجة
                </option>
              </select>
              <span style={{ marginLeft: "50px" }}>میاشت انتخاب کړئ</span>
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
                {console.log(y === x)}
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
                    <React.Fragment>
                      <StyledTableRow style={{display: 'none'}}>
                        {/* {(hours = row.entry_time.split(":")[0] * 3600)}
                        {(minutes = row.entry_time.split(":")[1] * 60)}
                        {(seconds = row.entry_time.split(":")[2])}
                        {console.log(hours + minutes + seconds)}
                        {console.log(seconds)} */}
                      </StyledTableRow>

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
                            ).toLocaleString("ar-SA", {
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
    </>
  );
};

export default SpecificUserAttendance;
