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
import { useState, useEffect } from "react";
import {
  getEmployees,
  removeEmployee,
} from "../../../../../../features/employees/employeesSlice";
import UpdateEmployee from "./UpdateEmployeeForm";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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

export default function Registered_table({ users }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = React.useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [element, setElement] = useState();
  const [open, setOpen] = useState(false);

  const itemsPerPage = 50;
  const totalPages = Math.ceil(data ? data.length / itemsPerPage : "");

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

  const dispatch = useDispatch();

  const handleRemove = (e) => {
    setId(e);
    dispatch(removeEmployee({ id: e }));
  };

  const handleUpdate = (e) => {
    setElement(e);
  };

  useEffect(() => {
    const getEmp = async () => {
      const emp = await dispatch(getEmployees());
      setData(emp.payload);
    };
    getEmp();
  }, [element, id, open]);

  const handleClose = () => {
    setOpen(false);
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
                نمبر
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }} scope="row">
                آیډي
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                نوم
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                تخلص
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                د پلار نوم
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                څانګه
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
                      {row.lastname}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {row.fathername}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {(element.department == "CEO" ? "عمومي ریاست" : "") ||
                        (element.department == "finance" ? "مالي ریاست" : "") ||
                        (element.department == "operation"
                          ? "عملیاتي ریاست"
                          : "") ||
                        (element.department == "business"
                          ? "تجارتي ریاست"
                          : "")}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      <Button variant="outlined" color="secondary">
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
                      {row.user_id}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {row.name}
                    </StyledTableCell>

                    <StyledTableCell style={{ textAlign: "right" }}>
                      {row.lastname}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {row.fathername}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {(row.department == "CEO" ? "عمومي ریاست" : "") ||
                        (row.department == "finance" ? "مالي ریاست" : "") ||
                        (row.department == "operation"
                          ? "عملیاتي ریاست"
                          : "") ||
                        (row.department == "business"
                          ? "تجارتي ریاست"
                          : "")}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          handleUpdate(row);
                        }}
                        variant="contained"
                        color="info"
                      >
                        تغیرول
                      </Button>
                      <Button
                        onClick={() => {
                          handleRemove(row.user_id);
                        }}
                        variant="contained"
                        color="error"
                        sx={{ marginRight: "10px" }}
                      >
                        لمنځه وړل
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
              <UpdateEmployee element={element} handleClose={handleClose} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
