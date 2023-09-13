 /* eslint-disable */
import React, { useEffect } from "react";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getUsers,
  getEmployees,
  getLogs,
} from "./../../../../features/logs/logsSlice";

const Center = () => {
  const [userCounter, setUserCounter] = useState(0);
  const [employeesCounter, setEmployeesCounter] = useState(0);
  const [attendanceCounter, setAttendanceCounter] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const getInfo = async () => {
      const users = await dispatch(getUsers());
      setUserCounter(users.payload);
      const employees = await dispatch(getEmployees());
      setEmployeesCounter(employees.payload);
      const logs = await dispatch(getLogs());
      setAttendanceCounter(logs.payload);
    };
    getInfo();
  }, []);

  let gregorian_date = new Date().toLocaleDateString("En-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let word1 = gregorian_date.split(" ")[2];
  let charToRemove1 = ",";
  let modifiedWord1 = word1.replace(new RegExp(charToRemove1, "g"), "");

  let word2 = gregorian_date.split(" ")[0];
  let charToRemove2 = ",";
  let modifiedWord2 = word2.replace(new RegExp(charToRemove2, "g"), "");

  const hijri_date = new Date().toLocaleDateString("Fa-Af", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let word = hijri_date.split(" ")[2];
  let charToRemove = ",";
  let modifiedWord = word.replace(new RegExp(charToRemove, "g"), "");

  const qamari_date = new Date().toLocaleDateString("Ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div dir="rtl">
      <div className="p-4 sm:ml-64 text-right" style={{ marginLeft: 0 }}>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols xl:grid-cols-5">
            <div className="min-w-32 bg-white min-h-48 p-3 font-medium">
              <div className="w-32 rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                <div className="block rounded-t overflow-hidden  text-center">
                  <div
                    className="bg-blue text-white py-1"
                    style={{ background: "blue" }}
                  >
                    {hijri_date.split(" ")[1]}
                  </div>
                  <div className="pt-1 border-l border-r border-white bg-white">
                    <span className="text-5xl font-bold leading-tight">
                      {modifiedWord}
                    </span>
                  </div>
                  <div className="border-l border-r border-b rounded-b-lg text-center text-black border-white bg-white -pt-2 -mb-1">
                    <span className="text-sm">{hijri_date.split(" ")[3]}</span>
                  </div>
                  <div className="pb-2 border-l border-r border-b text-black rounded-b-lg text-center border-white bg-white">
                    <hr />
                    <span className="text-xs leading-normal">
                      {hijri_date.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-32 bg-white min-h-48 p-3 font-medium">
              <div className="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                <div className="block rounded-t overflow-hidden  text-center">
                  <div
                    className="bg-blue text-white py-1"
                    style={{ background: "blue" }}
                  >
                    {qamari_date.split(" ")[2]}
                  </div>
                  <div className="pt-1 border-l border-r border-white bg-white">
                    <span className="text-5xl font-bold leading-tight">
                      {qamari_date.split(" ")[1]}
                    </span>
                  </div>
                  <div className="border-l border-r border-b rounded-b-lg text-center text-black border-white bg-white -pt-2 -mb-1">
                    <span className="text-sm">{hijri_date.split(" ")[3]}</span>
                  </div>
                  <div className="pb-2 border-l border-r border-b text-black rounded-b-lg text-center border-white bg-white">
                    <hr />
                    <span className="text-xs leading-normal">
                      {qamari_date.split(" ")[3]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-32 bg-white min-h-48 p-3 font-medium">
              <div className="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                <div className="block rounded-t overflow-hidden  text-center">
                  <div
                    className="bg-blue text-white py-1"
                    style={{ background: "blue" }}
                  >
                    {gregorian_date.split(" ")[1]}
                  </div>
                  <div className="pt-1 border-l border-r border-white bg-white">
                    <span className="text-5xl font-bold leading-tight">
                      {modifiedWord1}
                    </span>
                  </div>
                  <div className="border-l border-r border-b rounded-b-lg text-center text-black border-white bg-white -pt-2 -mb-1">
                    <span className="text-sm">{modifiedWord2}</span>
                  </div>
                  <div className="pb-2 border-l border-r border-b text-black rounded-b-lg text-center border-white bg-white">
                    <hr />
                    <span className="text-xs leading-normal">
                      {gregorian_date.split(" ")[3]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-white py-6 px-3 rounded-3xl w-80 my-4 shadow-xl h-40">
              <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-green-500 left-8 -top-0 ">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="mt-8">
                <p className="text-xl text-black font-semibold my-2">
                  ټول کاروونکي
                </p>
                <div className="border-t-2 "></div>

                <div className="flex justify-between text-black">
                  <div className="my-2">
                    <p className="font-semibold text-base mb-2 mr-10">
                      {/* {console.log(userCounter.length)} */}
                      <span className="text-3xl">
                        {userCounter.length > 0 ? userCounter[0].users : "0"}
                      </span>
                    </p>
                    <div className="flex space-x-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols xl:grid-cols-3">
              {/* <!-- 2 card --> */}
              <div className="relative bg-white py-6 px-3 rounded-3xl w-64 my-4 shadow-xl h-36">
                <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-green-500 left-4 -top-6">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <ReduceCapacityIcon />
                  </svg>
                </div>
                <div className="mt-8">
                  <p className="text-xl text-black font-semibold my-2">
                    ټول کار کوونکي
                  </p>
                  <div className="border-t-2 "></div>

                  <div className="flex justify-between text-black">
                    <div className="my-2">
                      <p className="font-semibold text-base mb-2">
                        {employeesCounter.length > 0
                          ? employeesCounter[0].employees
                          : "0"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- 3 card --> */}
              <div className="relative bg-white py-6 px-3 rounded-3xl w-64 my-4 shadow-xl h-36">
                <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-blue-500 left-4 -top-6">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div className="mt-8">
                  <p className="text-xl font-semibold my-2 text-black">
                    ټول ثبت شوې حاضري
                  </p>

                  <div className="border-t-2 "></div>

                  <div className="flex justify-between text-black">
                    <div className="my-2">
                      <p className="font-semibold text-base mb-2">
                        {employeesCounter.length > 0
                          ? employeesCounter[0].attendances
                          : "0"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- 4 card --> */}
              <div className="relative bg-white py-6 px-3 rounded-3xl w-64 my-4 shadow-xl h-36">
                <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-yellow-500 left-4 -top-6">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
                <div className="mt-8">
                  <p className="text-xl font-semibold my-2 text-black">
                    {/* Business Compare */}
                  </p>

                  <div className="border-t-2 "></div>

                  <div className="flex justify-between text-black">
                    <div className="my-2">
                      <p className="font-semibold text-base mb-2">
                        {/* Team Member */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center;
