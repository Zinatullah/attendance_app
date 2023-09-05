 /* eslint-disable */
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
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTwoMonths,
  getFridays,
  reset,
  grandReport,
} from "../../../../../features/report/reportSlice";
import {
  generalLeaveCheck,
  getAllvacation,
} from "./../../../../../features/attendance/attendanceSlice";

import { currentMonthGeneralLeaves } from "./../../../../../features/leave/leaveSlice";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";

const JDate = require("jalali-date");

const XLSX = require("xlsx");

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

const MONTHS = [
  "حمل",
  "ثور",
  "جوزا",
  "سرطان",
  "اسد",
  "سنبلهٔ",
  "میزان",
  "عقرب",
  "قوس",
  "جدی",
  "دلو",
  "حوت",
];

const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
export default function Current_month_report() {
  let current_month = new Date();
  current_month = current_month.toLocaleDateString("Fa-AF", {
    year: "numeric",
    month: "long",
    day: "numeric",
    nu: "ps",
  });

  let current_year = current_month.split(" ")[2];
  current_year = p2e(current_year);
  current_month = current_month.split(" ")[1];

  let index_of_current_month = MONTHS.indexOf(current_month);
  index_of_current_month = index_of_current_month - 1;
  let p_month = MONTHS[index_of_current_month];

  const [month, setMonth] = useState(current_month);
  const [previous_month, setPrevious_month] = useState(p_month);

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = React.useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);

  const itemsPerPage = 50;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : "";
  // const currentItems = data;

  const dispatch = useDispatch();

  const handleChanges = (e, value) => {
    setPage(value);
    setCurrentPage(value);
  };

  const month_data = {
    current_month: month,
    previous_month: previous_month,
    year: current_year,
  };

  const [person_vacation, setPersonVacation] = useState();
  const [general_vacation, setGeneralVacation] = useState();
  const [off_days, setOffDays] = useState();

  const get_monthly_report = async () => {
    const regular_days = await dispatch(getTwoMonths(month_data));
    const person_vacation = await dispatch(getAllvacation(month_data));
    setPersonVacation(person_vacation.payload);
    const general_vacation = await dispatch(
      currentMonthGeneralLeaves(month_data)
    );
    setGeneralVacation(general_vacation.payload);
    const off_days = await dispatch(getFridays(month_data));
    setOffDays(off_days.payload);
    const rep = await dispatch(grandReport());
    setData(rep.payload);
    setPage(1);
    handleChanges(1);
    setCurrentPage(1);
    reset();
  };

  useEffect(() => {
    setShow(false);
    get_monthly_report();
    reset();
  }, [month]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  const filterData = () => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (searchQuery.length == 0) {
      setShow(false);
    }

    if (searchQuery.length > 0) {
      setShow(true);
    }
    filterData();
  }, [searchQuery]);

  const handleDownload = () => {
    download_file();
  };

  let Download_File_array = [];

  data.map((element) => {
    const my_object = {
      ...element,
      month: current_month,
      total_dyas:
        element.days +
        element.fridays +
        element.vacation_days +
        element.generalLeaveDays,
    };
    Download_File_array.push(my_object);
  });

  console.log(data);
  console.log(Download_File_array);

  const download_file = async () => {
    const worksheet = await XLSX.utils.json_to_sheet(Download_File_array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "نوم",
          "میاشت",
          "آیډي",
          "حاضر ورځې",
          "پوره ورځې",
          "نیمه ورځې",
          "عمومي رخصتي",
          "جمعې",
          "اخستل شوې رخصتي",
          "پوره میاشت",
        ],
      ],
      {
        origin: "A1",
      }
    );

    const max_width = data.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet["!cols"] = [{ wch: max_width }];

    const file_name = `${month}.xlsx`;
    XLSX.writeFile(workbook, file_name, { compression: true });
  };

  let counter = 1;
  return (
    <>
      <div
        className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
        dir="rtl"
      >
        <div className="text-center text-black text-3xl mb-5">
          <h1>د اوسنی میاشتې راپور</h1>
        </div>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={5} sx={{ marginTop: "15px", width: "90%" }}>
              <div>
                <div className="relative mt-1 rounded-md shadow-sm ">
                  <input
                    type="text"
                    name="price"
                    className="block w-max rounded-md bg-gray-100 text-center text-black font-xl border-0 text-xl py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                    placeholder="نوم ولیکی"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sx={{ marginTop: "15px", marginRight: "100px" }}>
              <div className="relative mt-1 mb-2 rounded-md shadow-sm flex flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  size="large"
                  className="block w-70 rounded-md bg-gray-100 text-black font-xl border-0 text-xl py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                  onClick={handleDownload}
                >
                  اکسل فایل
                  <DownloadIcon sx={{ marginRight: "10px" }} />
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
        <TableContainer component={Paper} sx={{ width: "95%", marginLeft: 4 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ textAlign: "right" }} scope="row">
                  آیډی
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  نوم
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  میاشت
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  رسمي ورځې
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  جمعې
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  رخصتي
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  عمومي رخصتي
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  مجموعه{" "}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  ساعتونه
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                show &&
                filteredData.map((row, index) => (
                  <StyledTableRow key={index} dir="rtl">
                    <StyledTableCell
                      sx={{ display: "none", textAlign: "right" }}
                    ></StyledTableCell>
                    <StyledTableCell
                      sx={{ textAlign: "right" }}
                      component="th"
                      scope="row"
                    >
                      {counter + index}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {month}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.days}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.fridays}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.vacation_days}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.generalLeaveDays}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.days + row.fridays + row.generalLeaveDays}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.full_time * 8 +
                        row.half_time * 4 +
                        row.fridays * 8 +
                        row.generalLeaveDays * 8 +
                        row.vacation_days * 8}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow style={{ display: "none" }}>
                  <StyledTableCell sx={{ textAlign: "right" }}>
                    None
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
            <TableBody>
              {currentItems
                ? !show &&
                  currentItems.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        sx={{ display: "none", textAlign: "right" }}
                      ></StyledTableCell>
                      <StyledTableCell
                        sx={{ textAlign: "right" }}
                        component="th"
                        scope="row"
                      >
                        {counter + index}
                      </StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "right" }}>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "right" }}>
                        {month}
                      </StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "right" }}>
                        {row.days}
                      </StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "right" }}>
                        {row.fridays}
                      </StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "right" }}>
                        {row.vacation_days}
                      </StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "right" }}>
                        {row.generalLeaveDays}
                      </StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "right" }}>
                        {row.days +
                          row.fridays +
                          row.generalLeaveDays +
                          row.vacation_days}
                      </StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "right" }}>
                        {row.full_time * 8 +
                          row.half_time * 4 +
                          row.fridays * 8 +
                          row.generalLeaveDays * 8 +
                          row.vacation_days * 8}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : console.log("Test")}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2, marginTop: "1px" }}
          dir="ltr"
        >
          <Grid item xs={4}></Grid>
          <Grid item xs={3}>
            {
              <Pagination
                color="primary"
                count={totalPages}
                page={currentPage}
                onChange={handleChanges}
              />
            }
          </Grid>
          <Grid item xs={2} dir="rtl">
            صفحه: {page}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
