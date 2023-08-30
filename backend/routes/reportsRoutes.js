const express = require("express");
const router = express.Router();
const {
  getMonthReport,
  getDailyReport,
  current_report,
  getTwoMonths,
  getFridays,
  get_Friday,
  grandReport
} = require("../controllers/reportsController");

router.post("/currentReport", current_report);
router.post("/getDailyReport", getDailyReport);
router.post("/getMonthReport", getMonthReport);
router.post("/getMonthReport", getMonthReport);
router.post("/getTwoMonths", getTwoMonths);
router.post("/getFridays", getFridays);
router.post("/get_Friday", get_Friday);
router.get("/grandReport", grandReport);
module.exports = router;
