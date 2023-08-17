import { useEffect, useState } from "react";
import {
  leaveForm,
  reset,
} from "../../../../features/attendance/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const LeaveFrom = ({ username, handleClose }) => {
  const [month, setMonth] = useState("");
  const [leaveType, setLeaveType] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const { isError, isSuccess, message } = useSelector(
    (state) => state.attendance
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  const user_name = username[0].name;
  const user_id = username[0].user_id;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      user_id: user_id,
      firstName: user_name,
      month,
      leave_type: leaveType,
      start_date: data.get("from"),
      end_date: data.get("to"),
      info: data.get("info"),
    };
    dispatch(leaveForm(userData));
    handleClose();
  };

  return (
    <>
      <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gra-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              disabled
              placeholder={user_name}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Leave type
            </label>
            <div className="relative">
              <select
                required
                value={leaveType}
                onChange={handleChangeLeaveType}
                className="block appearance-none w-full bg-gray-200 text-right border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option className="text-right" disabled value="">
                  د رخصتی ډول انتخاب کړئ
                </option>
                <option value={1}>حج</option>
                <option value={2}>تفریحی</option>
                <option value={3}>مریضی ولادی</option>
                <option value={4}>مریضی</option>
                <option value={5}>ضرورت</option>
                <option value={6}>کسر معاش</option>
                <option value={7}>خدمتی</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Select Month
            </label>

            <div className="flex items-center rounded">
              <div className="input-group border border-gray-200 w-full">
                <select
                  value={month}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-gray-200 text-right border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option className="text-right pr-12" value="">
                    میاشت انتخاب کړئ
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
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  From
                </label>

                <div className="flex items-center rounded">
                  <div className="input-group border border-gray-200 w-full">
                    <input
                      required
                      type="number"
                      min="0"
                      name="from"
                      placeholder="Days"
                      className="form-control w-full bg-gray-200  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  To
                </label>

                <div className="flex items-center rounded">
                  <div className="input-group border border-gray-200 w-full">
                    <input
                      required
                      type="number"
                      min="0"
                      placeholder="Days"
                      name="to"
                      className="form-control w-full bg-gray-200  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 mt-10">
          <div className="w-full md:w-4/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Textfiled
            </label>

            <div className="flex items-center rounded w-full">
              <div className="input-group border border-gray-200 w-full">
                <textarea
                  placeholder="Enter text"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="story"
                  name="info"
                  rows="1"
                  cols="33"
                  required
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LeaveFrom;
