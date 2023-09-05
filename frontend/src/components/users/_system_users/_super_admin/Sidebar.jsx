 /* eslint-disable */
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CastIcon from "@mui/icons-material/Cast";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SummarizeIcon from "@mui/icons-material/Summarize";
import DevicesFoldIcon from "@mui/icons-material/DevicesFold";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import { logout, reset } from "../../../../features/auth/authSlice";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  //   "&:not(:last-child)": {
  //     borderBottom: 0,
  //   },
  //   "&:before": {
  //     display: "none",
  //   },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.9rem" }} />}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  // padding: theme.spacing(2),
  // border: "1px solid rgba(0, 0, 0, .125)",
  margin: theme.spacing(0),
}));

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed right-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
        dir="rtl"
        style={{ top: "110px" }}
      >
        <div className="h-full px-3 py-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/">
                <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                    style={{ marginRight: "10px" }}
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>

                  <Typography sx={{ paddingRight: "20px" }}>ډشبورد</Typography>
                </span>
              </Link>
            </li>
            {/* //////////////// System User /////////////////////// */}

            <li>
              <span className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  dir="ltr"
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className="hover:bg-gray-300"
                  >
                    <Typography
                      sx={{
                        paddingRight: "20px",
                        paddingLeft: "",
                        width: "130px",
                      }}
                    >
                      د سیستم کاروونکي
                    </Typography>
                    <ManageAccountsIcon />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography dir="rtl">
                      <Link to="/UserRegister">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <PersonAddIcon />
                          <span className="ml-3 pr-5">نوی کاروونکی</span>
                        </span>
                      </Link>
                      <Link to="/UpdateUser">
                        <span
                          width="100%"
                          className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                        >
                          <ReduceCapacityIcon />
                          <span className="ml-3 pr-5">ټول کاروونکي</span>
                        </span>
                      </Link>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </span>
            </li>

            {/* //////////////// System User /////////////////////// */}
            <li>
              <span className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                  dir="ltr"
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className="hover:bg-gray-300"
                  >
                    <Typography
                      sx={{
                        paddingRight: "20px",
                        paddingLeft: "",
                        width: "130px",
                        marginTop: 0,
                      }}
                    >
                      کار کوونکي
                    </Typography>
                    <CalendarMonthIcon />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography dir="rtl">
                      <Link to="/newemployee">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <PersonAddIcon />
                          <span className="ml-3 pr-5">نوی کار کوونکي</span>
                        </span>
                      </Link>
                      <Link to="/registeredemployees">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <Diversity3Icon />
                          <span className="ml-3 pr-5">ثبت شوي کار کوونکي</span>
                        </span>
                      </Link>
                      <Link to="/users">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <Diversity3Icon />
                          <span className="ml-3 pr-5">ټول کار کوونکي</span>
                        </span>
                      </Link>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </span>
            </li>

            {/* ////////////// Devices section////////////// */}
            <li>
              <span className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                <Accordion
                  expanded={expanded === "panel6"}
                  onChange={handleChange("panel6")}
                  dir="ltr"
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className="hover:bg-gray-300"
                  >
                    <Typography
                      sx={{
                        paddingRight: "20px",
                        paddingLeft: "",
                        width: "130px",
                        marginTop: 0,
                      }}
                    >
                      د رخصتی فورم
                    </Typography>
                    <ContactMailIcon />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography dir="rtl">
                      <Link to="/specificUser">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <PersonIcon />
                          <span className="ml-3 pr-5">د ځانګړي کارکوونکي</span>
                        </span>
                      </Link>
                      <Link to="/generalLeaveCheck">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <GroupsIcon />
                          <span className="ml-3 pr-5">عمومي رخصتي</span>
                        </span>
                      </Link>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </span>
            </li>

            {/* ////////////// Devices section////////////// */}
            <li>
              <span className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                  dir="ltr"
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className="hover:bg-gray-300"
                  >
                    <Typography
                      sx={{
                        paddingRight: "20px",
                        paddingLeft: "",
                        width: "130px",
                        marginTop: 0,
                      }}
                    >
                      د حاضری وسیلې{" "}
                    </Typography>
                    <CastIcon />
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography dir="rtl">
                      <Link to="/devices">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <DevicesFoldIcon />
                          <span className="ml-3 pr-5">ټولې وسیلې</span>
                        </span>
                      </Link>
                      {/* <Link>
                        <span
                          to="/viewerDashboard"
                          width="100%"
                          className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                        >
                          <DevicesFoldIcon />
                          <span className="ml-3 pr-5">دوهمه وسیله</span>
                        </span>
                      </Link>
                      <Link>
                        <span
                          to="/viewerDashboard"
                          width="100%"
                          className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                        >
                          <DevicesFoldIcon />
                          <span className="ml-3 pr-5">دریمه وسیله</span>
                        </span>
                      </Link> */}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </span>
            </li>

            {/* ////////////// Report section////////////// */}
            <li>
              <span className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                <Accordion
                  expanded={expanded === "panel5"}
                  onChange={handleChange("panel5")}
                  dir="ltr"
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className="hover:bg-gray-300"
                  >
                    <Typography
                      sx={{
                        paddingRight: "20px",
                        paddingLeft: "",
                        width: "130px",
                        marginTop: 0,
                      }}
                    >
                      د حاضری راپور
                    </Typography>
                    <EditCalendarIcon />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography dir="rtl">
                      <Link to="/currentreport">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <SummarizeIcon />
                          <span className="ml-3 pr-5">سهارنۍ راپور</span>
                        </span>
                      </Link>
                      <Link to="/dailyreport">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <SummarizeIcon />
                          <span className="ml-3 pr-5">ورځنی مکمل راپور</span>
                        </span>
                      </Link>
                      <Link to="/currentmonth">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <AssessmentIcon />
                          <span className="ml-3 pr-5">اوسنی میاشت راپور</span>
                        </span>
                      </Link>
                      <Link to="/monthlyreport">
                        <span className="flex items-center p-1 pr-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700">
                          <AssessmentIcon />
                          <span className="ml-3 pr-5">میاشتنی راپور</span>
                        </span>
                      </Link>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </span>
            </li>

            {/* ////////////// Logout section////////////// */}
            <li>
              <span className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                <Accordion expanded={expanded === "panel4"} dir="ltr">
                  <AccordionSummary
                    onClick={handleLogout}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className="hover:bg-gray-300"
                  >
                    <Typography
                      sx={{
                        paddingRight: "20px",
                        paddingLeft: "",
                        width: "130px",
                        marginTop: 0,
                      }}
                    >
                      له سیستم وتل
                    </Typography>
                    <LogoutIcon />
                  </AccordionSummary>
                </Accordion>
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
