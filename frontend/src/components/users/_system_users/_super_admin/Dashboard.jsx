/* eslint-disable */
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Center from "./Center";
import { logout, reset } from "../../../../features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     const user_type = user.user_type;
  //     if (user_type === "superAdmin") {
  //       navigate("/");
  // }
  // if (user_type === "admin") {
  //   navigate("/adminDashboard");
  // }
  // if (user_type === "viewer") {
  //   navigate("/viewerDashboard");
  // }
  //   }
  // }, [user, navigate]);

  return (
    <>
      <nav
        className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        style={{ height: "100px" }}
      >
        <Navbar />
      </nav>
      <Sidebar />
      <div
        className="p-4 mt-8 sm:ml-64"
        style={{ marginLeft: 0, width: "80%" }}
      >
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="text-2xl text-gray-400 dark:text-gray-500">
            <Center />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
