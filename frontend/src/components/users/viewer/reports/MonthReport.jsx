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
  getMonthReport,
  reset,
} from "./../../../../features/report/reportSlice";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
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
  "سنبله",
  "میزان",
  "عقرب",
  "قوس",
  "جدی",
  "دلو",
  "حوت",
];

const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
export default function AttendanceTable() {
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

  const handleChange = (event) => {
    setMonth(event.target.value);
    let index_of_current_month = MONTHS.indexOf(event.target.value);
    index_of_current_month = index_of_current_month - 1;
    setPrevious_month(MONTHS[index_of_current_month]);
  };

  const handleChanges = (e, value) => {
    setPage(value);
    setCurrentPage(value);
  };

  const month_data = {
    current_month: month,
    previous_month: previous_month,
    year: current_year,
  };

  const get_monthly_report = async () => {
    const dd = await dispatch(getMonthReport(month_data));
    setData(dd.payload);
    setPage(1);
    handleChanges(1);
    setCurrentPage(1);
    reset();
  };
  console.log(data);

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

  const download_file = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

    XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Month", "ID", "Days"]], {
      origin: "A1",
    });

    const max_width = data.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet["!cols"] = [{ wch: max_width }];

    const file_name = `${month}.xlsx`;
    XLSX.writeFile(workbook, file_name, { compression: true });
  };

  let counter = 1;
  return (
    <>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <select
              value={month}
              onChange={handleChange}
              className="border-gray-700 mt-5 border-dashed rounded-lg bg-purple-900 text-white"
              style={{
                marginLeft: "50px",
                marginRight: "50px",
                width: "300px",
              }}
            >
              <option className="text-right pr-12" value="">
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

          <Grid item xs={3} sx={{ marginTop: "15px", width: "50%" }}>
            <div>
              <div className="relative mt-1 rounded-md shadow-sm ">
                <input
                  type="text"
                  name="price"
                  className="block w-60 rounded-md bg-gray-100 text-black font-xl border-0 text-xl py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                  placeholder="Search Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={2} sx={{ marginTop: "15px", marginLeft: "" }}>
            <div className="relative mt-1 mb-2 rounded-md shadow-sm flex flex-end">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                className="block w-70 rounded-md bg-gray-100 text-black font-xl border-0 text-xl py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                onClick={handleDownload}
              >
                Download file
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
              <StyledTableCell scope="row">ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell>Days</StyledTableCell>
              <StyledTableCell>Off days</StyledTableCell>
              <StyledTableCell>Hours</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              show &&
              filteredData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {counter + index}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{month}</StyledTableCell>
                  <StyledTableCell>{row.days}</StyledTableCell>
                  <StyledTableCell>{}</StyledTableCell>
                  <StyledTableCell>{(row.full_time * 8) + (row.half_time * 4)}</StyledTableCell>
                  {/* <StyledTableCell>{row.half_time}</StyledTableCell> */}
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow style={{ display: "none" }}>
                <StyledTableCell>None</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
          <TableBody>
            {currentItems
              ? !show &&
                currentItems.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell sx={{ display: "none" }}>
                      {console.log(row)}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {counter + index}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{month}</StyledTableCell>
                    <StyledTableCell>{row.days}</StyledTableCell>
                    <StyledTableCell>{}</StyledTableCell>
                    <StyledTableCell>{(row.full_time * 8) + (row.half_time * 4)}</StyledTableCell>
                    {/* <StyledTableCell>{row.half_time}</StyledTableCell> */}
                  </StyledTableRow>
                ))
              : console.log("Test")}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: "1px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={2}>
          Page: {page}
        </Grid>
        <Grid item xs={7}>
          {
            <Pagination
              color="primary"
              count={totalPages}
              page={currentPage}
              onChange={handleChanges}
            />
          }
        </Grid>
      </Grid>
    </>
  );
}
