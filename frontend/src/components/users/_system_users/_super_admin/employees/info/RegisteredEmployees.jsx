import { getEmployees, removeEmployee, updateEmployee } from "../../../../../../features/employees/employeesSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Registered_table from "./Registered_table";

const RegisteredEmployees = () => {
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
      const data = await dispatch(getEmployees());
      setUsers(data.payload);
    };
    handleSubmit();
  }, [dispatch]);

  return (
    <>
      <section
        className="bg-white dark:bg-gray-900"
        style={{ direction: "right" }}
        dir="rtl"
      >
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="text-2xl text-gray-400 dark:text-gray-500">
            <Registered_table users={users} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisteredEmployees;
