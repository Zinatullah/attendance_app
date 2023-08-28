const express = require("express");
const router = express.Router();
const {
  getMonthReport,
  getDailyReport,
  current_report,
  getFridays,
  get_Friday,
} = require("../controllers/reportsController");

router.post("/currentReport", current_report);
router.post("/getDailyReport", getDailyReport);
router.post("/getMonthReport", getMonthReport);
router.post("/getMonthReport", getMonthReport);
router.post("/getFridays", getFridays);
router.post("/getFriday", get_Friday);
module.exports = router;
