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
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import LeaveForm from "./LeaveFrom";
import VacationTable from "./VacationTable";

import { useState, useEffect } from "react";

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
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = React.useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState('')

  const itemsPerPage = 50;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : "";

  const handleChanges = (e, value) => {
    setPage(value);
    setCurrentPage(value);
  };

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

  useEffect(() => {
    setData(users);
  }, [users]);

  const handleClose = () => {
    setOpens(false);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloses = () => {
    setOpens(false);
  };

  const handleClickOpens = () => {
    setOpens(true);
  };

  return (
    <>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} sx={{ marginTop: "15px", marginBottom: "15px" }}>
            <div>
              <div className="relative mt-1 rounded-md shadow-sm ">
                <input
                  type="text"
                  name="price"
                  className="block rounded-md bg-gray-100 text-center text-black font-xl border-0 text-2xl py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                  placeholder="نوم ولیکی"
                  style={{ width: "80%" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </form>
      <TableContainer component={Paper} dir="rtl" className="text-right">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ textAlign: "right" }} scope="row">
                آیډي
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                نوم
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                د پلار نوم
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; نور معلومات
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              ? show &&
                filteredData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ textAlign: "right" }}
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      <Button variant="outlined" color="primary">
                        فورم
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ marginRight: "10px" }}
                      >
                        <Link to={`/SpecificUser/${row.user_id}`}>معلومات</Link>
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : console.log("Test")}
          </TableBody>

          <TableBody>
            {currentItems
              ? !show &&
                currentItems.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ textAlign: "right" }}
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ textAlign: "center", marginLeft: "0px" }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleClickOpen();
                          setUsername(row);
                        }}
                      >
                        فورم
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: "10px" }}
                        onClick={() => {
                          handleClickOpens();
                          setUsername(row);
                          setName(row.name)
                        }}
                      >
                        معلومات
                      </Button>
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
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
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

      <React.Fragment>
        <Dialog fullWidth open={open} maxWidth="md" onClose={handleClose}>
          <DialogTitle className="text-center bg-teal-700 text-white">
            د رخصتی فورم
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
              <LeaveForm username={username} handleClose={handleClose} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>بندول</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {/* <React.Fragment>
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
                بندول
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
          <VacationTable username={username} name={name} handleCloses={handleCloses} />
        </Dialog>
      </React.Fragment> */}
    </>
  );
}
