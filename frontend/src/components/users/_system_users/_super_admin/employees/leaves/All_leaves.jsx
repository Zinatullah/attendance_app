/* eslint-disable */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import DownloadIcon from "@mui/icons-material/Download";
const XLSX = require("xlsx");

import {
  getsingleuser,
  vacation,
  removeVacation,
} from "../../../../../../features/attendance/attendanceSlice";
import { singleUserAllLeaves } from "../../../../../../features/leave/leaveSlice";

import { getFriday } from "../../../../../../features/report/reportSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import EditLeaveForm from "./EditLeaveForm";

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

const All_leaves = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = React.useState(false);
  const [previousVacation, setPreviousVacation] = useState();
  const [userr, setUser] = useState("");
  const [count, setCount] = useState();

  const dispatch = useDispatch();
  const location = useLocation();

  const userId = location.pathname.split("/")[2];

  console.log(userId)

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);



  const handleSubmit = async () => {
    const userData = {
      username: userId,
    };
    const username = await dispatch(getsingleuser(userId));
    setUsername(username.payload);
    const get_vacation = await dispatch(singleUserAllLeaves(userData));
    setPreviousVacation(get_vacation.payload);
  };


  console.log(username)
  useEffect(() => {
    handleSubmit();
  }, [userId, month, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleVacation = async () => {
    const userData = {
      id: userId,
    };
    const get_vacation = await dispatch(vacation(userData));
    setPreviousVacation(get_vacation.payload);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRemove = async (e) => {
    const id = e.id;
    dispatch(removeVacation({ id }));
    setCount(previousVacation ? previousVacation.length : 0);
  };

  useEffect(() => {
    handleSubmit()
  }, [count, open])
  


  return (
    <>
      <div
        className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-1"
      >
        <h1 className="text-center text-black mb-5 mt-10"> ټوله رخصتي</h1>

        <TableContainer component={Paper} dir="rtl">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ textAlign: "center" }} scope="row">
                  نمبر
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  د رخصتی ډول
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  د شروع وخت
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  ختمېدل
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  ورځې
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  میاشت
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;معلومات
                </StyledTableCell>
                <StyledTableCell>نور معلومات</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previousVacation ? (
                previousVacation.map((element, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{element.leave_type}</StyledTableCell>
                    <StyledTableCell>{element.start_date}</StyledTableCell>
                    <StyledTableCell>{element.end_date}</StyledTableCell>
                    <StyledTableCell>
                      {element.end_date - element.start_date}
                    </StyledTableCell>
                    <StyledTableCell>{element.month}</StyledTableCell>
                    <StyledTableCell className="w-60 text-right">
                      {element.info}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="contained"
                        onClick={() => {
                          handleClickOpen(element);
                          setUser(element);
                        }}
                        color="success"
                      >
                        تغیرول
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          handleClickRemove(element);
                        }}
                      >
                        لمنځه وړل
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell>
                    په دې میاشت کې هېڅ رخصتي شتون نلري
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <React.Fragment>
        <Dialog fullWidth open={open} maxWidth="md" onClose={handleClose}>
          <DialogTitle className="text-center bg-teal-700 text-white">
            د رخصتی تغیرولو فورم
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
                user={userr}
                handleClose={handleClose}
                handleVacation={handleVacation}
                name={username ? username[0].name : ""}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>بندول</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default All_leaves;
