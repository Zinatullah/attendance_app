import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);

  const itemsPerPage = 50;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const filterData = () => {
    const filteredData = users.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    filterData();
    setShow(true);
  }, [searchQuery]);

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setFilteredData("");
    setPage(value);
    setCurrentPage(value);
  };

  return (
    <>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={5} sx={{ marginTop: "15px", width: "100%", marginRight: '50px'}}>
            <div>
              <div className="relative mt-2 rounded-md shadow-sm ">
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md bg-purple-500 text-white font-xl border-0 text-xl py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb-5 text-center "
                  placeholder="نوم پلټل"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" size="large" sx={{marginTop: '20px', marginLeft: '20px'}}>ټول کارمندان</Button>
          </Grid>
        </Grid>
      </form>
      <TableContainer component={Paper} style={{ display: "" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="text-right" scope="row">
                نمبر
              </StyledTableCell>
              <StyledTableCell className="text-right" scope="row">
                د کارمند آیډي
              </StyledTableCell>
              <StyledTableCell className="text-right">نوم</StyledTableCell>
              <StyledTableCell className="text-right"></StyledTableCell>
              <StyledTableCell className="text-right">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;معلومات
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredData.length > 0
              ? filteredData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      className="text-right"
                      component="th"
                      scope="row"
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell className="text-right">
                      {row.user_id}
                    </StyledTableCell>
                    <StyledTableCell className="text-right">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell className="text-right"></StyledTableCell>
                    <StyledTableCell className="text-right">
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
                  <StyledTableRow
                    key={index}
                    sx={{ display: `${show} ? 'none' : ''` }}
                  >
                    <StyledTableCell
                      className="text-right"
                      component="th"
                      scope="row"
                    >
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell className="">
                      {row.user_id}
                    </StyledTableCell>
                    <StyledTableCell className="">{row.name}</StyledTableCell>
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
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Stack>
    </>
  );
}
