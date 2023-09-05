 /* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "./../../../../../features/auth/authSlice";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user_type, setUser_type] = useState("");

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
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
    if (isSuccess) {
      toast.success("User registered successfully");
      dispatch(reset());
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (event) => {
    setUser_type(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      user_type,
    };
    dispatch(register(userData));
    reset()
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
            د نوي کاروونکي معلومات ولیکی
          </h2>
          <form onSubmit={handleSubmit} className="">
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
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
                />
              </div>

              <div className="w-full">
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
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  د صلاحیت ډول
                </label>
                <select
                  onChange={handleChange}
                  id="category"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="" disabled>
                    د صلاحیت ډول مشخص کړئ{" "}
                  </option>
                  <option value="superAdmin">مکمل صلاحیت</option>
                  <option value="admin">منځنی صلاحیت</option>
                  <option value="viewer">کتونکی</option>
                </select>
              </div>
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
