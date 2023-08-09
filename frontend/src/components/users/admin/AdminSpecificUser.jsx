import { Fragment } from "react";
import { getUserAttendance } from "../../../features/userAttendance/attendanceSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout, reset } from "../../../features/auth/authSlice";
import Navbar from "./Navbar";

const AdminSpecificUser = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState();
  const [month, setMonth] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleSubmit = async () => {
      const data = await dispatch(getUserAttendance(userId, month));
      setEmployee(data.payload);
    };
    handleSubmit();
  }, [userId, month, dispatch]);

  let arr = [];
  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  var colorPicker = "";
  const validTime = 2970000;
  var pickedTime = "";
  var str1;

  var totalSeconds1;
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <nav
        className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        style={{ height: "100px" }}
      >
        <Navbar />
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-20 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/adminusers"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Users Attendance
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/adminuserregister"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Register User
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admindevices"
                className="flex bg-gray-200 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Device</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  <button onClick={handleLogout}>Logout</button>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 mt-10">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="w-full text-gray-500">
            <form>
              <span style={{ marginLeft: "100px" }}>Please Select Month</span>
              <select
                value={month}
                onChange={handleChange}
                className="w-auto ml-15 bg-gray-200"
                style={{ width: "400px", marginLeft: "50px" }}
              >
                <option disabled value="">
                  Select month
                </option>
                <option value="Jan">Januari</option>
                <option value="Feb">Febrevary</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
              </select>
            </form>
          </div>
          {employee ? (
            employee.map((element, index) => (
              <span key={index}>
                {element.date.split(" ")[1] === month ? arr.push(element) : ""}
                {console.log(arr)}
              </span>
            ))
          ) : (
            <span></span>
          )}
          <div className="text-2xl text-gray-400 dark:text-gray-500">
            <div className="table w-full p-2">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-2 border-r cursor-pointer text-sm font-bold text-cyan-950">
                      <div className="flex">Count</div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-bold text-cyan-950">
                      <div className="flex">Name</div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-bold text-cyan-950">
                      <div className="flex">Attendance</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arr ? (
                    arr.map((element, index) => (
                      <Fragment key={index}>
                        <tr className="hidden">
                          <td>
                            {(pickedTime =
                              element.date.split(" ")[4]).toString()}
                            {(str1 = pickedTime.split(":"))}
                            {
                              (totalSeconds1 = parseInt(
                                str1[0] * 3600 + str1[1] * 60 + str1[2]
                              ))
                            }
                            {parseInt(totalSeconds1) > parseInt(validTime)
                              ? (colorPicker = "bg-red-400")
                              : (colorPicker = "bg-sky-400")}
                            test
                          </td>
                        </tr>
                        <tr
                          className={`bg-gray-100 ${colorPicker} text-cyan-950 border-b text-sm `}
                        >
                          <td className="p-2 border-r">
                            {user ? index + 1 : "No User"}
                          </td>
                          <td className="p-2 border-r">
                            {user ? element.name : "No User"}
                          </td>
                          <td className="p-2 border-r">
                            {user ? element.date : "No User"}
                          </td>
                        </tr>
                      </Fragment>
                    ))
                  ) : (
                    <tr className="bg-gray-100  border-b text-sm text-black-600">
                      <td>No Attendance</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSpecificUser;
