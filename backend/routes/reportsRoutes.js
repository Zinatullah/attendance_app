const express = require("express");
const router = express.Router();
const { getMonthReport, getDailyReport, current_report } = require("../controllers/reportsController");

router.post("/currentReport", current_report);
router.post("/getDailyReport", getDailyReport);
router.post("/getMonthReport", getMonthReport);
module.exports = router;
