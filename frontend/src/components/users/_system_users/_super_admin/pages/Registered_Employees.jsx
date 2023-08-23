import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import RegisteredEmployees from "../employees/info/RegisteredEmployees";

const AllEmployeesInfo = () => {
  return (
    <>
      <nav
        className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        style={{ height: "100px" }}
      >
        <Navbar />
      </nav>
      <Sidebar />

      <div className="p-4 sm:ml-64" style={{ marginLeft: 0, width: "80%" }}>
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="text-2xl text-gray-400 dark:text-gray-500">
            <RegisteredEmployees />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEmployeesInfo;
