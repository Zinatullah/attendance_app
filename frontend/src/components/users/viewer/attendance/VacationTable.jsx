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
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditLeaveForm from "./EditLeaveForm";
import { removeVacation } from "../../../../features/attendance/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

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

let specific_element = {};
const VacationTable = ({ vacation, username, handleVacation }) => {
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = useState(vacation ? vacation.length : 0);
  const dispatch = useDispatch();

  useEffect(() => {
    handleVacation();
  }, [count]);

  const { isError, isSuccess, message } = useSelector(
    (state) => state.attendance
  );

  const handleClickOpen = (e) => {
    specific_element = e;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleVacation();
  };

  const handleClickRemove = async (e) => {
    const id = e.id;
    dispatch(removeVacation({ id }));
    setCount(vacation ? vacation.length : 0);
  };

  useEffect(() => {
    if (isSuccess) {
      handleVacation();
    }
  }, [isSuccess, message]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell scope="row">ID</StyledTableCell>
              <StyledTableCell>Leave type</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Days</StyledTableCell>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Info
              </StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacation ? (
              vacation.map((element, index) => (
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
                  <StyledTableCell>
                    {element.end_date - element.start_date}
                  </StyledTableCell>
                  <StyledTableCell>
                    {element.month == 1 ? "محرم" : ""}
                    {element.month == 2 ? "صفر" : ""}
                    {element.month == 3 ? "ربیع الآول" : ""}
                    {element.month == 4 ? "ربیع الآخر" : ""}
                    {element.month == 5 ? "جمادی الآولی" : ""}
                    {element.month == 6 ? "جمادی الآخرة" : ""}
                    {element.month == 7 ? "رجب" : ""}
                    {element.month == 8 ? "شعبان" : ""}
                    {element.month == 9 ? "رمضان" : ""}
                    {element.month == 10 ? "شوال" : ""}
                    {element.month == 11 ? "ذو القعده" : ""}
                    {element.month == 12 ? "ذو الحجه" : ""}
                  </StyledTableCell>
                  <StyledTableCell className="w-60 text-right">
                    {element.info}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      style={{ marginRight: "2px" }}
                      variant="outlined"
                      onClick={() => {
                        handleClickOpen(element);
                      }}
                      color="secondary"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={(e) => {
                        handleClickRemove(element);
                      }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell>No record</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <React.Fragment>
        <Dialog fullWidth open={open} maxWidth="md" onClose={handleClose}>
          <DialogTitle className="text-center bg-teal-700 text-white">
            Edit Vacation form
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
                username={username}
                element={specific_element}
                handleClose={handleClose}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {console.log(specific_element, 'From here')}
    </>
  );
};

export default VacationTable;
