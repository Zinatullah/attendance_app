/* eslint-disable */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getDailyReport,
  reset,
} from "../../../../../features/report/reportSlice";
import Pagination from "@mui/material/Pagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MONTHS = [
  "حمل",
  "ثور",
  "جوزا",
  "سرطان",
  "اسد",
  "سنبله",
  "میزان",
  "عقرب",
  "قوس",
  "جدی",
  "دلو",
  "حوت",
];

const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
export default function AttendanceTable() {
  let current_month = new Date();
  current_month = current_month.toLocaleDateString("Fa-AF", {
    year: "numeric",
    month: "long",
    day: "numeric",
    nu: "ps",
  });
  let get_today = current_month.split(" ")[0];

  let current_year = current_month.split(" ")[2];

  current_year = p2e(current_year);
  current_month = current_month.split(" ")[1];

  console.log(get_today, 'Today');

  let index_of_current_month = MONTHS.indexOf(current_month);
  index_of_current_month = index_of_current_month - 1;
  let p_month = MONTHS[index_of_current_month];

  const [month, setMonth] = useState(current_month);

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = React.useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [today, setDay] = useState(p2e(get_today));

  const month_data = {
    current_month: month,
    today: today,
    year: current_year,
  };

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const get_daily_report = async () => {
    const dd = await dispatch(getDailyReport(month_data));
    setData(dd.payload);
    setPage(1);
    handleChanges(1);
    setCurrentPage(1);
    reset();
  };

  let mapped_arry = [];
  data.map((row) => {
    let before_time = row.entry_time;
    before_time = before_time.split(":")[0];

    let after_time = row.exit_time;
    after_time = after_time.split(":")[0];

    if (before_time < 12 && after_time > 12) {
      mapped_arry.push(row);
    }
  });

  useEffect(() => {
    setShow(false);
    get_daily_report();
    reset();
  }, [month]);

  const filterData = () => {
    const filteredData = mapped_arry.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (searchQuery.length == 0) {
      setShow(false);
    }

    if (searchQuery.length > 0) {
      setShow(true);
    }
    filterData();
  }, [searchQuery]);

  const handleDay = (e) => {
    setDay(e.target.value);
  };

  useEffect(() => {
    get_daily_report();
  }, [today, month]);

  const itemsPerPage = 50;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? mapped_arry.slice(indexOfFirstItem, indexOfLastItem)
    : "";
  const dispatch = useDispatch();

  const handleChanges = (e, value) => {
    setPage(value);
    setCurrentPage(value);
  };

  let counter = 1;
  return (
    <>
      <div
        className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
        dir="rtl"
      >
        <div className="text-center text-black text-3xl mb-5 mb-5">
          <h1>ورځنی راپور</h1>
        </div>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <select
                value={month}
                onChange={handleChange}
                className="border-gray-700 mt-5 mb-5 border-dashed rounded-lg bg-purple-900 text-white"
                style={{
                  marginLeft: "50px",
                  marginRight: "50px",
                  width: "300px",
                }}
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
            </Grid>

            <Grid item xs={3} sx={{ marginTop: "15px", width: "50%" }}>
              <input
                type="number"
                onChange={handleDay}
                min="1"
                max="31"
                className="block w-32 rounded-md bg-gray-100 text-black border-0 text-xl placeholder:text-gray-500 "
                placeholder="ورځ"
              />
            </Grid>

            <Grid item xs={3} sx={{ marginTop: "15px", width: "50%" }}>
              <div>
                <div className="relative mt-1 rounded-md shadow-sm ">
                  <input
                    type="text"
                    name="price"
                    className="block w-60 rounded-md bg-gray-100 text-black font-xl border-0 text-xl py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                    placeholder="نوم ولیکی"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sx={{ marginTop: "15px", marginRight: "100px" }}>
              <div className="relative mt-1 mb-2 rounded-md shadow-sm flex flex-end"></div>
            </Grid>
          </Grid>
        </form>

        <TableContainer component={Paper} sx={{ width: "95%", marginLeft: 4 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ textAlign: "right" }} scope="row">
                  آیډی
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  نوم
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  میاشت
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  ورځ
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}></StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  داخېلېدل
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  وتل
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                show &&
                filteredData.map((row, index) => (
                  <StyledTableRow key={index} dir="rtl">
                    <StyledTableCell
                      sx={{ textAlign: "right" }}
                      component="th"
                      scope="row"
                    >
                      {counter + index}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {month}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.day}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.entry_time}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.exit_time}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow style={{ display: "none" }}>
                  <StyledTableCell sx={{ textAlign: "right" }}>
                    None
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
            <TableBody>
              {currentItems ? (
                !show &&
                mapped_arry.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      sx={{ display: "none", textAlign: "right" }}
                    ></StyledTableCell>
                    <StyledTableCell
                      sx={{ textAlign: "right" }}
                      component="th"
                      scope="row"
                    >
                      {counter + index}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {month}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.day}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.entry_time}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "right" }}>
                      {row.exit_time}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow></StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2, marginTop: "1px" }}
          dir="ltr"
        >
          <Grid item xs={4}></Grid>
          <Grid item xs={3}>
            {
              <Pagination
                color="primary"
                count={totalPages}
                page={currentPage}
                onChange={handleChanges}
              />
            }
          </Grid>
          <Grid item xs={2} dir="rtl">
            صفحه: {currentPage}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
