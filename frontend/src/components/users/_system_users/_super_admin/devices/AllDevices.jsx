import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { logout } from "../../../../../features/auth/authSlice";
import {
  reset,
  getUsers,
  getAttendance,
  clearAttendances,
  getDeviceStatus,
  getAttendanceCount,
  getAlldeveicesStatus,
  getUsersFromAllDevices,
  getAttendancesFromAllDevices,
  getCountAttendancesFromAllDevices,
} from "../../../../../features/devices/devicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "@mui/material/Container";
import * as React from "react";
import Grid from "@mui/material/Grid";

const ViewerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.devices
  );
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleGetUsers = (event) => {
    dispatch(getUsers(event));
  };

  const handleGetAttendance = (event) => {
    dispatch(getAttendance(event));
  };

  const handleClearAttendance = (event) => {
    dispatch(clearAttendances(event));
  };

  const handleDeviceStatus = (e) => {
    dispatch(getDeviceStatus(e));
  };

  const handleGetAttendanceCount = (e) => {
    dispatch(getAttendanceCount(e));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success");
      dispatch(reset());
      setOpen(false);
    }
    if (isError) {
      console.log(message);
      toast.error(message);
      dispatch(reset());
      setOpen(false);
    }
    if (isLoading) {
      setOpen(true);
    }
    dispatch(reset());
  }, [isSuccess, isError, message, isLoading]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const get_all_deveices_status = async () => {
    dispatch(getAlldeveicesStatus());
  };
  const get_users_from_all_devices = async () => {
    dispatch(getUsersFromAllDevices());
  };
  const get_attendances_from_all_devices = async () => {
    dispatch(getAttendancesFromAllDevices());
  };
  const get_Count_attendances_from_all_devices = async () => {
    dispatch(getCountAttendancesFromAllDevices());
  };
  return (
    <>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <div
        className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
        dir="rtl"
      >
        <div className="flex items-center justify-center h-100 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <div className="text-4xl text-black dark:text-gray-500">
            <Container className="mt-10">
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <p className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white text-center">
                      لمړی وسیله
                    </p>
                    <ul className="my-4 space-y-3">
                      <li>
                        <button
                          onClick={(e) => {
                            handleDeviceStatus(1);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] ml-1 h-[20px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 22 22"
                          >
                            <path d="M15 11 9.186 8.093a.933.933 0 0 1-.166-.039L9 8.047v6.885c0 .018.009.036.011.054l2.49-3.125L15 11Z" />
                            <path d="m10.366 2.655 5.818 3.491a4.2 4.2 0 0 1 1.962 3.969 3.237 3.237 0 0 1-2.393 2.732c-.024.007-.048.005-.073.011-.065.032-.132.06-.2.084l-2.837.7-2.077 2.606a1.99 1.99 0 0 1-.7.56c.05.036.09.081.144.113a2.127 2.127 0 0 0 2.08.037c.618-.348 2.242-1.262 4.836-3.038l.291-.2c1.386-.94 3.772-2.565 4.138-4.428A10.483 10.483 0 0 0 6.869 1.349c1.211.302 2.385.74 3.497 1.306Z" />
                            <path d="M4.023 16.341V9.558A3.911 3.911 0 0 1 5.784 6.3a4.062 4.062 0 0 1 3.58-.257c.184.031.362.088.53.169l6 3c.086.052.168.11.246.174a2.247 2.247 0 0 0-.994-1.529L9.4 4.407c-1.815-.9-4.074-1.6-5.469-1.152a10.46 10.46 0 0 0 .534 15.953 18.151 18.151 0 0 1-.442-2.867Z" />
                            <path d="m18.332 15.376-.283.192c-2.667 1.827-4.348 2.773-4.9 3.083a4.236 4.236 0 0 1-2.085.556 4.092 4.092 0 0 1-2.069-.561 3.965 3.965 0 0 1-1.951-3.373A1.917 1.917 0 0 1 7 15V8c0-.025.009-.049.01-.074A1.499 1.499 0 0 0 6.841 8a1.882 1.882 0 0 0-.82 1.592v6.7c.072 1.56.467 3.087 1.16 4.486A10.474 10.474 0 0 0 21.3 13.047a20.483 20.483 0 0 1-2.968 2.329Z" />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د وسیلې حالت کتل
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetUsers(1);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 19"
                          >
                            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                          </svg>
                          <span className="flex-1 whitespace-nowrap">
                            ټول کارکوونکي ترلاسه کول
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetAttendance(1);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د ټولو کارکوونکو حاضری ترلاسه کول
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetAttendanceCount(1);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری تعداد ترلاسه کول
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={(e) => {
                            handleClearAttendance(4);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری پاکول
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </Grid>

                <Grid item md={6}>
                  <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <p className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white text-center">
                      دوهمه وسیله
                    </p>
                    <ul className="my-4 space-y-3">
                      <li>
                        <button
                          onClick={(e) => {
                            handleDeviceStatus(2);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] ml-1 h-[20px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 22 22"
                          >
                            <path d="M15 11 9.186 8.093a.933.933 0 0 1-.166-.039L9 8.047v6.885c0 .018.009.036.011.054l2.49-3.125L15 11Z" />
                            <path d="m10.366 2.655 5.818 3.491a4.2 4.2 0 0 1 1.962 3.969 3.237 3.237 0 0 1-2.393 2.732c-.024.007-.048.005-.073.011-.065.032-.132.06-.2.084l-2.837.7-2.077 2.606a1.99 1.99 0 0 1-.7.56c.05.036.09.081.144.113a2.127 2.127 0 0 0 2.08.037c.618-.348 2.242-1.262 4.836-3.038l.291-.2c1.386-.94 3.772-2.565 4.138-4.428A10.483 10.483 0 0 0 6.869 1.349c1.211.302 2.385.74 3.497 1.306Z" />
                            <path d="M4.023 16.341V9.558A3.911 3.911 0 0 1 5.784 6.3a4.062 4.062 0 0 1 3.58-.257c.184.031.362.088.53.169l6 3c.086.052.168.11.246.174a2.247 2.247 0 0 0-.994-1.529L9.4 4.407c-1.815-.9-4.074-1.6-5.469-1.152a10.46 10.46 0 0 0 .534 15.953 18.151 18.151 0 0 1-.442-2.867Z" />
                            <path d="m18.332 15.376-.283.192c-2.667 1.827-4.348 2.773-4.9 3.083a4.236 4.236 0 0 1-2.085.556 4.092 4.092 0 0 1-2.069-.561 3.965 3.965 0 0 1-1.951-3.373A1.917 1.917 0 0 1 7 15V8c0-.025.009-.049.01-.074A1.499 1.499 0 0 0 6.841 8a1.882 1.882 0 0 0-.82 1.592v6.7c.072 1.56.467 3.087 1.16 4.486A10.474 10.474 0 0 0 21.3 13.047a20.483 20.483 0 0 1-2.968 2.329Z" />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د وسیلې حالت کتل
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetUsers(2);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 19"
                          >
                            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                          </svg>
                          <span className="flex-1 whitespace-nowrap">
                            ټول کارکوونکي ترلاسه کول
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetAttendance(2);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د ټولو کارکوونکو حاضری ترلاسه کول
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetAttendanceCount(2);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری تعداد ترلاسه کول
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={(e) => {
                            handleClearAttendance(4);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری پاکول
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </Grid>

                <Grid item md={6}>
                  <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <p className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white text-center">
                      دریمه وسیله
                    </p>
                    <ul className="my-4 space-y-3">
                      <li>
                        <button
                          onClick={(e) => {
                            handleDeviceStatus(3);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] ml-1 h-[20px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 22 22"
                          >
                            <path d="M15 11 9.186 8.093a.933.933 0 0 1-.166-.039L9 8.047v6.885c0 .018.009.036.011.054l2.49-3.125L15 11Z" />
                            <path d="m10.366 2.655 5.818 3.491a4.2 4.2 0 0 1 1.962 3.969 3.237 3.237 0 0 1-2.393 2.732c-.024.007-.048.005-.073.011-.065.032-.132.06-.2.084l-2.837.7-2.077 2.606a1.99 1.99 0 0 1-.7.56c.05.036.09.081.144.113a2.127 2.127 0 0 0 2.08.037c.618-.348 2.242-1.262 4.836-3.038l.291-.2c1.386-.94 3.772-2.565 4.138-4.428A10.483 10.483 0 0 0 6.869 1.349c1.211.302 2.385.74 3.497 1.306Z" />
                            <path d="M4.023 16.341V9.558A3.911 3.911 0 0 1 5.784 6.3a4.062 4.062 0 0 1 3.58-.257c.184.031.362.088.53.169l6 3c.086.052.168.11.246.174a2.247 2.247 0 0 0-.994-1.529L9.4 4.407c-1.815-.9-4.074-1.6-5.469-1.152a10.46 10.46 0 0 0 .534 15.953 18.151 18.151 0 0 1-.442-2.867Z" />
                            <path d="m18.332 15.376-.283.192c-2.667 1.827-4.348 2.773-4.9 3.083a4.236 4.236 0 0 1-2.085.556 4.092 4.092 0 0 1-2.069-.561 3.965 3.965 0 0 1-1.951-3.373A1.917 1.917 0 0 1 7 15V8c0-.025.009-.049.01-.074A1.499 1.499 0 0 0 6.841 8a1.882 1.882 0 0 0-.82 1.592v6.7c.072 1.56.467 3.087 1.16 4.486A10.474 10.474 0 0 0 21.3 13.047a20.483 20.483 0 0 1-2.968 2.329Z" />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د وسیلې حالت کتل
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetUsers(3);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 19"
                          >
                            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                          </svg>
                          <span className="flex-1 whitespace-nowrap">
                            ټول کارکوونکي ترلاسه کول
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetAttendance(3);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د ټولو کارکوونکو حاضری ترلاسه کول
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetAttendanceCount(3);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری تعداد ترلاسه کول
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={(e) => {
                            handleClearAttendance(4);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری پاکول
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </Grid>

                {/* <Grid item md={6}>
                  <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <p className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white text-center">
                      څلورمه وسیله
                    </p>
                    <ul className="my-4 space-y-3">
                      <li>
                        <button
                          onClick={(e) => {
                            handleDeviceStatus(4);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] ml-1 h-[20px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 22 22"
                          >
                            <path d="M15 11 9.186 8.093a.933.933 0 0 1-.166-.039L9 8.047v6.885c0 .018.009.036.011.054l2.49-3.125L15 11Z" />
                            <path d="m10.366 2.655 5.818 3.491a4.2 4.2 0 0 1 1.962 3.969 3.237 3.237 0 0 1-2.393 2.732c-.024.007-.048.005-.073.011-.065.032-.132.06-.2.084l-2.837.7-2.077 2.606a1.99 1.99 0 0 1-.7.56c.05.036.09.081.144.113a2.127 2.127 0 0 0 2.08.037c.618-.348 2.242-1.262 4.836-3.038l.291-.2c1.386-.94 3.772-2.565 4.138-4.428A10.483 10.483 0 0 0 6.869 1.349c1.211.302 2.385.74 3.497 1.306Z" />
                            <path d="M4.023 16.341V9.558A3.911 3.911 0 0 1 5.784 6.3a4.062 4.062 0 0 1 3.58-.257c.184.031.362.088.53.169l6 3c.086.052.168.11.246.174a2.247 2.247 0 0 0-.994-1.529L9.4 4.407c-1.815-.9-4.074-1.6-5.469-1.152a10.46 10.46 0 0 0 .534 15.953 18.151 18.151 0 0 1-.442-2.867Z" />
                            <path d="m18.332 15.376-.283.192c-2.667 1.827-4.348 2.773-4.9 3.083a4.236 4.236 0 0 1-2.085.556 4.092 4.092 0 0 1-2.069-.561 3.965 3.965 0 0 1-1.951-3.373A1.917 1.917 0 0 1 7 15V8c0-.025.009-.049.01-.074A1.499 1.499 0 0 0 6.841 8a1.882 1.882 0 0 0-.82 1.592v6.7c.072 1.56.467 3.087 1.16 4.486A10.474 10.474 0 0 0 21.3 13.047a20.483 20.483 0 0 1-2.968 2.329Z" />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د وسیلې حالت کتل
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetUsers(4);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 19"
                          >
                            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                          </svg>
                          <span className="flex-1 whitespace-nowrap">
                            ټول کارکوونکي ترلاسه کول
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleGetAttendance(4);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د ټولو کارکوونکو حاضری ترلاسه کول
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={(e) => {
                            handleGetAttendanceCount(4);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری تعداد ترلاسه کول
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            handleClearAttendance(4);
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری پاکول
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </Grid> */}

                <Grid item md={6}>
                  <div className="w-full max-w-md p-4 bg-blue-400 border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <p className="mb-3 w-full text-base font-semibold text-gray-900 md:text-xl dark:text-white text-center">
                      ټولې وسیلې
                    </p>
                    <ul className="my-4 space-y-3">
                      {/* <li>
                        <button
                          onClick={(e) => {
                            get_all_deveices_status();
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-blue-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] ml-1 h-[20px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 22 22"
                          >
                            <path d="M15 11 9.186 8.093a.933.933 0 0 1-.166-.039L9 8.047v6.885c0 .018.009.036.011.054l2.49-3.125L15 11Z" />
                            <path d="m10.366 2.655 5.818 3.491a4.2 4.2 0 0 1 1.962 3.969 3.237 3.237 0 0 1-2.393 2.732c-.024.007-.048.005-.073.011-.065.032-.132.06-.2.084l-2.837.7-2.077 2.606a1.99 1.99 0 0 1-.7.56c.05.036.09.081.144.113a2.127 2.127 0 0 0 2.08.037c.618-.348 2.242-1.262 4.836-3.038l.291-.2c1.386-.94 3.772-2.565 4.138-4.428A10.483 10.483 0 0 0 6.869 1.349c1.211.302 2.385.74 3.497 1.306Z" />
                            <path d="M4.023 16.341V9.558A3.911 3.911 0 0 1 5.784 6.3a4.062 4.062 0 0 1 3.58-.257c.184.031.362.088.53.169l6 3c.086.052.168.11.246.174a2.247 2.247 0 0 0-.994-1.529L9.4 4.407c-1.815-.9-4.074-1.6-5.469-1.152a10.46 10.46 0 0 0 .534 15.953 18.151 18.151 0 0 1-.442-2.867Z" />
                            <path d="m18.332 15.376-.283.192c-2.667 1.827-4.348 2.773-4.9 3.083a4.236 4.236 0 0 1-2.085.556 4.092 4.092 0 0 1-2.069-.561 3.965 3.965 0 0 1-1.951-3.373A1.917 1.917 0 0 1 7 15V8c0-.025.009-.049.01-.074A1.499 1.499 0 0 0 6.841 8a1.882 1.882 0 0 0-.82 1.592v6.7c.072 1.56.467 3.087 1.16 4.486A10.474 10.474 0 0 0 21.3 13.047a20.483 20.483 0 0 1-2.968 2.329Z" />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            Get All devices status
                          </span>
                        </button>
                      </li> */}

                      <li>
                        <button
                          onClick={(e) => {
                            get_users_from_all_devices();
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-red-400 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 19"
                          >
                            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                          </svg>
                          <span className="flex-1 whitespace-nowrap">
                            ټول کارکوونکي ترلاسه کول
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={(e) => {
                            get_attendances_from_all_devices();
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-red-400 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap">
                            د ټولو کارکوونکو حاضري ترلاسه کول
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={(e) => {
                            get_Count_attendances_from_all_devices();
                          }}
                          className="flex items-center w-full p-3 text-base font-bold text-black rounded-lg bg-gray-100 hover:bg-red-400 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <svg
                            className="w-[20px] h-[20px] ml-1 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 16 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                            />
                          </svg>
                          <span className="flex-1 text-center whitespace-nowrap ml-3">
                            د حاضری تعداد
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewerDashboard;
