/* eslint-disable */
import * as React from "react";
import { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import {singleUserAllLeaves} from "../../../../../../features/leave/leaveSlice";
import { useDispatch, useSelector } from "react-redux";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import DownloadIcon from "@mui/icons-material/Download";
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

const AllLeaves = ({ username, handleClose }) => {
  const [previousVacation, setpreviousVacation] = useState("");

  const dispatch = useDispatch();
  const user_name = username.user_id ;

  useEffect(() => {
    const handleSubmit = async () => {
      const userData = {
        username: user_name
      };
      const data = await dispatch(singleUserAllLeaves(userData));
      setpreviousVacation(data.payload)
    };
    handleSubmit()

  }, []);

  console.log(previousVacation)
  

  return (
    <>
      <TableContainer component={Paper} dir="rtl" sx={{ marginTop: "20px" }}>
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
    </>
  );
};

export default AllLeaves;
