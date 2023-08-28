import * as React from "react";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  reset,
  updateEmployee,
} from "../../../../../../features/employees/employeesSlice";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateEmployeeForm({ element, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");

  const { isError, isSuccess, message } = useSelector(
    (state) => state.employees
  );

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, isSuccess]);

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      id: element.user_id,
      user_id: data.get("user_id"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      fathername: data.get("fathername"),
      department: department ? department : element.department,
    };
    dispatch(updateEmployee(userData));
    handleClose();
  };
  return (
    <>
      <section
        className="bg-white dark:bg-gray-900"
        style={{ direction: "right" }}
        dir="rtl"
      >
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">
            د نوي کار کوونکي معلومات ولیکی
          </h2>
          <form onSubmit={handleSubmit} className="">
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  نوم
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="د کاروونکي نوم ولیکی"
                  required={true}
                  defaultValue={element.name}
                />
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="fathername"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  د پلار نوم
                </label>
                <input
                  type="text"
                  name="fathername"
                  id="fathername"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="د کاروونکي د پلار ولیکی"
                  required={true}
                  defaultValue={element.fathername}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  تخلص
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="price"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" د کاروونکي تخلص ولیکی"
                  required={true}
                  defaultValue={element.lastname}
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  څانګه
                </label>
                <select
                  onChange={handleChange}
                  required
                  defaultValue={element.department}
                  id="category"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option defaultValue={element.department} disabled style={{ background: "lightgray" }}>
                    {(element.department == "CEO" ? "عمومي ریاست" : "") ||
                      (element.department == "finance" ? "مالي ریاست" : "") ||
                      (element.department == "operation"
                        ? "عملیاتي ریاست"
                        : "") ||
                      (element.department == "business" ? "تجارتي ریاست" : "")}
                  </option>
                  <option value="CEO">عمومي ریاست</option>
                  <option value="finance">مالی ریاست</option>
                  <option value="operation">عملیاتي ریاست</option>
                  <option value="business"> تجارتي ریاست</option>
                </select>
              </div>
              <div className="w-full" style={{ width: "208%" }}>
                <label
                  htmlFor="user_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  آیډي
                </label>
                <input
                  type="number"
                  name="user_id"
                  id="user_id"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" د کارکوونکي هغه آیډي ولیکی چې د حاضری په وسیله کې ثبت شوې ده"
                  required={true}
                  defaultValue={element.user_id}
                />
              </div>
              {/* <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ایمیل آدرس
                </label>
                <input
                  type="email"
                  name="email"
                  id="brand"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="ایمیل آدرس ولیکی"
                  required={true}
                />
              </div>

              <div>
                <label
                  htmlFor="item-weight"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  پټ نوم
                </label>
                <input
                  type="password"
                  name="password"
                  id="item-weight"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="پټ نوم ولیکی"
                  required={true}
                />
              </div> */}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="contained" fullWidth type="submit">
                لېږل
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
