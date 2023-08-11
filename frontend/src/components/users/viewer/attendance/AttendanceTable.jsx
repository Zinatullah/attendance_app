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
import { useDispatch } from "react-redux";
import { getMonthReport } from "./../../../../features/report/reportSlice";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";

import {
  reset,
  getmultipleusers,
} from "./../../../../features/attendance/attendanceSlice";
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

export default function AttendanceTable({ users }) {
  const [month, setMonth] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 50;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
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

  const handleChanges = (event, value) => {
    setFilteredData("");
    setPage(value);
    setCurrentPage(value);
    console.log("1")
  };

  const get_monthly_report = async () => {
    const dd = await dispatch(getmultipleusers());
    setData(dd.payload);
    reset();
    console.log("console.log")
  };

  useEffect(() => {
    get_monthly_report();
    console.log("Test")
  }, [month]);

  const filterData = () => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('test')
    setFilteredData(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery]);

  return (
    <>
      <form>
        <Grid container spacing={2} sx={{ position: "static" }}>
          <Grid item xs={3}></Grid>
          <Grid
            item
            xs={5}
            sx={{ marginTop: "15px", width: "100%", marginRight: "50px" }}
          >
            <div>
              <div className="relative mt-2 rounded-md shadow-sm ">
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md bg-black text-white font-xl border-0 text-xl py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb-5 text-center "
                  placeholder="نوم پلټل"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </form>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", marginLeft: 4, marginBottom: 3 }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell scope="row">No</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0
              ? filteredData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {console.log(row)}
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.user_id}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell className="">
                      <Button variant="outlined" color="secondary">
                        <Link
                          to={`/ViewerSpecificUserAttendance/${row.user_id}`}
                        >
                          Details
                        </Link>
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : currentItems.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {console.log(row)}
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.user_id}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell className="">
                    <Button variant="outlined" color="secondary">
                      <Link
                        to={`/ViewerSpecificUserAttendance/${row.user_id}`}
                      >
                        Details
                      </Link>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
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
