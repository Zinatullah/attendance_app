 /* eslint-disable */
import { getmultipleusers } from "../../../../../../features/attendance/attendanceSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout, reset } from "../../../../../../features/auth/authSlice";
import Leave_table from "./Leave_table";

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleSubmit = async () => {
      const data = await dispatch(getmultipleusers());
      setUsers(data.payload);
    };
    handleSubmit();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <section
        className="bg-white dark:bg-gray-900"
        style={{ direction: "right" }}
        dir="rtl"
      >
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="text-2xl text-gray-400 dark:text-gray-500">
            <Leave_table users={users} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Employees;
