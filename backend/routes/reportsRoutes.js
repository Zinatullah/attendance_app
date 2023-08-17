const express = require("express");
const router = express.Router();
const { getMonthReport, getDailyReport } = require("../controllers/reportsController");

router.post("/getDailyReport", getDailyReport);
router.post("/getMonthReport", getMonthReport);
module.exports = router;
