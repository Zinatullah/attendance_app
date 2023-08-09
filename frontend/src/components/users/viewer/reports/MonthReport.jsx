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
import { getMonthReport, reset } from "./../../../../features/report/reportSlice";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";

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

export default function AttendanceTable() {
  const [month, setMonth] = useState("");
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
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.reports
  );


  const dispatch = useDispatch();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let current_month = new Date();
  current_month = months[current_month.getMonth()];

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const handleChanges = (e, value) => {
    setPage(value);
    setCurrentPage(value);
  };

  const get_monthly_report = async () => {
    const dd = await dispatch(getMonthReport(month ? month : current_month));
    setData(dd.payload);
    setPage(1);
    setCurrentPage(1);
    reset()
  };

  useEffect(() => {
    get_monthly_report();
    reset()
  }, [month]);

  const filterData = () => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
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
              className="border-gray-700 mt-5 mb-5  flex item-end text-xl text-white border-dashed rounded-lg bg-purple-900"
              style={{
                marginLeft: "15%",
                width: "80%",
              }}
            >
              <option className="text-center" disabled value="">
                میاشت انتخاب کړئ
              </option>
              <option className="text-Left" value={months[0]}>
                {months[0]}
              </option>
              <option className="text-Left" value={months[1]}>
                {months[1]}
              </option>
              <option className="text-Left" value={months[2]}>
                {months[2]}
              </option>
              <option className="text-Left" value={months[3]}>
                {months[3]}
              </option>
              <option className="text-Left" value={months[4]}>
                {months[4]}
              </option>
              <option className="text-Left" value={months[5]}>
                {months[5]}
              </option>
              <option className="text-Left" value={months[6]}>
                {months[6]}
              </option>
              <option className="text-Left" value={months[7]}>
                {months[7]}
              </option>
              <option className="text-Left" value={months[8]}>
                {months[8]}
              </option>
              <option className="text-Left" value={months[9]}>
                {months[9]}
              </option>
              <option className="text-Left" value={months[10]}>
                {months[10]}
              </option>
              <option className="text-Left" value={months[11]}>
                {months[11]}
              </option>
            </select>
          </Grid>

          <Grid item xs={3} sx={{ marginTop: "15px", width: "50%" }}>
            <div>
              <div className="relative mt-2 rounded-md shadow-sm ">
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
            <div className="relative mt-2 rounded-md shadow-sm flex flex-end">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0
              ? filteredData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {counter + index}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.month}</StyledTableCell>
                    <StyledTableCell>{row.days}</StyledTableCell>
                  </StyledTableRow>
                ))
              : currentItems.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {counter + index}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.month}</StyledTableCell>
                    <StyledTableCell>{row.days}</StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: "1px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={2}>
          Page: {page}
        </Grid>
        <Grid item xs={7}>
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            onChange={handleChanges}
          />
        </Grid>
      </Grid>
    </>
  );
}
