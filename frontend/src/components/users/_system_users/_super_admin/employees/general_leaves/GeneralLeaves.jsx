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
import { useDispatch, useSelector } from "react-redux";
import {
  removeGeneralLeave,
  reset,
} from "./../../../../../../features/leave/leaveSlice";
import { useState } from "react";
import { generalLeaveCheck } from "../../../../../../features/attendance/attendanceSlice";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import GeneralEditLeaveForm from "./GeneralEditLeaveForm";
import { useEffect } from "react";

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

export default function GeneralLeaves({}) {
  const [vacation, setVacation] = useState();
  const [count, setCount] = useState(vacation ? vacation.length : 0);
  const [open, setOpen] = React.useState(false);
  const [specificElement, setSpecificElement] = useState();

  const dispatch = useDispatch();

  const general_leave_check = async () => {
    const result = await dispatch(generalLeaveCheck());
    setVacation(result.payload);
  };

  const handleClickRemove = async (e) => {
    const id = e.id;
    dispatch(removeGeneralLeave(id));
    setCount(vacation ? vacation.length : 0);
  };

  const handleClickOpen = (e) => {
    setSpecificElement(e);
    setOpen(true);
  };

  const { isError, isSuccess, message } = useSelector((state) => state.leave);

  useEffect(() => {
    general_leave_check();
    reset();
  }, [isSuccess, count]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <section
        className="bg-white dark:bg-gray-900"
        style={{ direction: "right" }}
        dir="rtl"
      >
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">

          <TableContainer component={Paper} style={{ marginTop: "5px" }}>
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
                      <StyledTableCell>{element.leave_type}</StyledTableCell>
                      <StyledTableCell>{element.start_date}</StyledTableCell>
                      <StyledTableCell>{element.end_date}</StyledTableCell>
                      <StyledTableCell>
                        {element.end_date - element.start_date}
                      </StyledTableCell>
                      <StyledTableCell>{element.month}</StyledTableCell>
                      <StyledTableCell>{element.info}</StyledTableCell>
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
                General vacation edit form
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
                  <GeneralEditLeaveForm
                    element={specificElement}
                    handleClose={handleClose}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </div>
      </section>
    </>
  );
}
