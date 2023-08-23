import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateGeneralLeave,
  reset,
} from "./../../../../../../features/leave/leaveSlice";

const LeaveFrom = ({ handleClose, element }) => {
  const [month, setMonth] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const { isError, isSuccess, message } = useSelector((state) => state.leave);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, message]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      id: element.id,
      month: month ? month : element.month,
      leave_type: data.get("leave_type"),
      start_date: data.get("from"),
      end_date: data.get("to"),
      info: data.get("info"),
    };
    dispatch(updateGeneralLeave(userData));
    handleClose();
  };

  return (
    <>
      <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6" dir="rtl">
          <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase text-right mr-5 tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              د رخصتی ډول
            </label>
            <input
              required
              className="appearance-none text-right block w-full bg-gray-200 text-gray-700 border border-gra-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="د رخصتی ډول مشخص کړئ"
              name="leave_type"
              defaultValue={element.leave_type}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2" dir="rtl">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              className="block  text-right mr-5 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              میاشت انتخاب کړئ
            </label>

            <div className="flex items-center rounded">
              <div className="input-group border border-gray-200 w-full">
                <select
                  value={month ? month : element.month}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-gray-200 text-right border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option
                    className="text-right bg-red-400"
                    disabled
                    defaultValue={element.month}
                  >
                    {element.month}
                  </option>
                  <option className="text-right" value="حمل">
                    حمل
                  </option>
                  <option className="text-right" value="ثور">
                    ثور
                  </option>
                  <option className="text-right" value="جوزا">
                    جوزا
                  </option>
                  <option className="text-right" value="سرطان">
                    سرطان
                  </option>
                  <option className="text-right" value="اسد">
                    اسد
                  </option>
                  <option className="text-right" value="سنبله">
                    سنبله
                  </option>
                  <option className="text-right" value="میزان">
                    میزان
                  </option>
                  <option className="text-right" value="عقرب">
                    عقرب
                  </option>
                  <option className="text-right" value="قوس">
                    قوس
                  </option>
                  <option className="text-right" value="جدی">
                    جدی
                  </option>
                  <option className="text-right" value="دلو">
                    دلو
                  </option>
                  <option className="text-right" value="حوت">
                    حوت
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <div className="flex items-center rounded">
              <div className="input-group w-full">
                <label
                  className="block text-right mr-5 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  له
                </label>

                <div className="flex items-center rounded">
                  <div className="input-group border text-right border-gray-200 w-full">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      name="from"
                      placeholder="ورځ"
                      defaultValue={element.start_date}
                      className="form-control w-full text-right bg-gray-200  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <div className="flex items-center rounded">
              <div className="input-group w-full">
                <label
                  className="block uppercase text-right mr-5 tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  تر
                </label>

                <div className="flex items-center rounded">
                  <div className="input-group border border-gray-200 w-full">
                    <input
                      type="number"
                      min="0"
                      placeholder="ورځ"
                      name="to"
                      max="30"
                      defaultValue={element.end_date}
                      className="form-control text-right w-full bg-gray-200  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 mt-10" dir="rtl">
          <div className="w-full md:w-4/4 px-3 mb-6 md:mb-0">
            <label
              className="block mr-5 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              جزئیات
            </label>

            <div className="flex items-center rounded w-full">
              <div className="input-group  border border-gray-200 w-full">
                <textarea
                  className="block text-right cursor-right appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="story"
                  name="info"
                  rows="1"
                  cols="33"
                  placeholder="جزئیات"
                  defaultValue={element.info}
                ></textarea>
              </div>
            </div>
          </div>
          <div className=" pt-5 w-20 pl-50 md:mb-0"></div>
          <div className=" pt-5 w-96 mt-5">
            <button
              className="flex-shrink-0 bg-teal-500 w-full hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-xl border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              لېږل
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LeaveFrom;
