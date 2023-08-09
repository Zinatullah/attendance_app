import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import GeneralLeaveCheck from "./GeneralLeaveCheck";
import GeneralLeaveForm from "./GeneralLeaveForm";
import { generalLeaveCheck } from "../../../../features/attendance/attendanceSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BackupTableIcon from "@mui/icons-material/BackupTable";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import MonthReport from './../reports/MonthReport'

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmployeesInfo({ callback, handleClickOpened }) {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [isToggled, setToggled] = useState(false);
  const [vacation, setVacation] = useState();

  const dispatch = useDispatch();

  const handleData = () => {
    handleClickOpened();
    setToggled(!isToggled);
    callback(isToggled);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpened(false);
    setOpen(false);
  };

  const general_leave_check = async () => {
    const result = await dispatch(generalLeaveCheck());
    setVacation(result.payload);
  };

  const handleClickOpens = () => {
    general_leave_check();
    setOpens(true);
  };
  const handleCloses = () => {
    setOpens(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleMonthReport = () => {
    setOpened(true);
  };

  const handleClosed = () => {
    setOpened(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: false,
                },
              },
            },
            palette: {
              mode: "dark",
              primary: { main: "rgb(102, 157, 246)" },
              background: { paper: "rgb(5, 30, 52)" },
            },
          })}
        >
          <Paper elevation={0} sx={{ width: 950 }}>
            <FireNav component="nav" disablePadding>
              <ListItemButton>
                <ListItemText
                  sx={{ my: 0 }}
                  primary="Employees Attendances"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              </ListItemButton>
              <Divider />
              <Divider />
              <Box
                sx={{
                  bgcolor: "rgba(71, 98, 130, 0.2)",
                  pt: 0,
                  pb: 1,
                  py: 2,
                  minHeight: 32,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginRight: "30px", marginLeft: "120px" }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <People />
                  </ListItemIcon>
                  <ListItemText
                    primary="All Employees"
                    onClick={handleData}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </Button>

                <Button
                  variant="contained"
                  sx={{ marginRight: "30px" }}
                  color="info"
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <PermMedia />
                  </ListItemIcon>
                  <ListItemText
                    onClick={handleClickOpens}
                    primary="Check vacation "
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginRight: "30px" }}
                  color="info"
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <Dns />
                  </ListItemIcon>
                  <ListItemText
                    onClick={handleClickOpen}
                    primary="Vacation form"
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  bgcolor: "rgba(71, 98, 130, 0.2)",
                  pt: 0,
                  pb: 1,
                  py: 2,
                  minHeight: 32,
                }}
              >
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginRight: "30px", marginLeft: "120px" }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <BackupTableIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Monthly Report"
                    onClick={handleMonthReport}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </Button>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                {/* <Button
                  variant="contained"
                  sx={{ marginRight: "30px" }}
                  color="info"
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <PermMedia />
                  </ListItemIcon>
                  <ListItemText
                    onClick={handleClickOpens}
                    primary="Check vacation "
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginRight: "30px" }}
                  color="info"
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <Dns />
                  </ListItemIcon>
                  <ListItemText
                    onClick={handleClickOpen}
                    primary="Vacation form"
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </Button> */}
              </Box>
            </FireNav>
          </Paper>
        </ThemeProvider>
      </Box>

      <React.Fragment>
        <Dialog fullWidth open={open} maxWidth="md" onClose={handleClose}>
          <DialogTitle className="text-center bg-teal-700 text-white">
            د رخصتی فورمه
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
              <GeneralLeaveForm handleClose={handleClose} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <div className="p-4 sm:ml-64 mt-5">
        <Dialog fullWidth open={opens} maxWidth="sx" onClose={handleCloses}>
          <DialogTitle className="text-center bg-teal-700 text-white mt-5">
            د رخصتی کتل
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
                width: "sx",
              }}
            >
              <GeneralLeaveCheck
                vacation={vacation}
                general_leave_check={general_leave_check}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="p-4 sm:ml-64 mt-5">
        <React.Fragment>
          <Dialog fullScreen open={opened} TransitionComponent={Transition}>
            <AppBar sx={{ position: "relative", background: "lightgray" }}>
              <Toolbar>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                  color="black"
                  onClick={handleClosed}
                  className="cursor-pointer"
                >
                  Close
                </Typography>
                <IconButton
                  edge="start"
                  color="black"
                  onClick={handleClosed}
                  aria-label="close"
                  className="cursor-pointer"
                >
                  <CloseIcon className="cursor-pointer" />
                </IconButton>
              </Toolbar>
            </AppBar>
            <MonthReport />
          </Dialog>
        </React.Fragment>
      </div>
    </>
  );
}
